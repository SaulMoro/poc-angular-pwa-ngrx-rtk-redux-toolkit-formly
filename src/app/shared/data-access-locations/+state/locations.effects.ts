import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, merge, of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  tap,
  concatMap,
  withLatestFrom,
  filter,
  debounceTime,
  groupBy,
  mergeMap,
  exhaustMap,
} from 'rxjs/operators';

import { matchRouteEnter, matchRouteFilter, matchRoutePageChange, ofRoute } from '@app/core/data-access-router';
import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { SeoService } from '@app/core/seo';
import { fromStore } from '@app/shared/utils';
import { LocationsActions } from './locations.slice';
import * as LocationsSelectors from './locations.selectors';
import { LocationsService } from '../services/locations.service';
import { fromLocationResponsesToLocations, fromLocationResponseToLocation } from '../models/location-response.model';

@Injectable()
export class LocationsEffects {
  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofRoute('/locations', matchRouteEnter, matchRouteFilter, matchRoutePageChange),
      map(({ queryParams: currentFilter, page }) => ({ currentFilter, page: page ?? 1 })),
      fromStore(LocationsSelectors.getLoadedPages)(this.store),
      filter(([{ page }, loadedPages]) => !loadedPages.includes(page)),
      switchMap(([{ currentFilter, page }]) =>
        this.locationsService.getLocations(currentFilter, page).pipe(
          map(({ info, results }) =>
            LocationsActions.loadListSuccess({
              data: fromLocationResponsesToLocations(results).map((location) => ({
                ...location,
                page,
              })),
              pages: info?.pages || page,
              page,
            })
          ),
          catchError((error) => of(LocationsActions.loadListFailure(error)))
        )
      )
    )
  );

  /* prefetchNextPageOfLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsApiActions.loadLocationsSuccess),
      fromStore(LocationsSelectors.getCurrentFilter, LocationsSelectors.getLoadedPages)(this.store),
      filter(([action, , loadedPages]) => action.page < action.pages && !loadedPages.includes(action.page + 1)),
      mergeMap(([action, currentFilter]) =>
        this.locationsService.getLocations(currentFilter, action.page + 1).pipe(
          map(({ info, results }) =>
            LocationsApiActions.prefetchNextLocationsPageSuccess({
              locations: fromLocationResponsesToLocations(results).map((location) => ({
                ...location,
                page: action.page + 1,
              })),
              count: info?.count || results.length,
              pages: info?.pages || action.page + 1,
              page: action.page + 1,
            })
          ),
          catchError((error) => of(LocationsApiActions.prefetchNextLocationsPageFailure({ error })))
        )
      )
    )
  ); */

  loadLocation$ = createEffect(() => ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    merge(
      this.actions$.pipe(
        ofRoute('/locations/:id', matchRouteEnter),
        map(({ params: { id } }) => +id)
      ),
      this.actions$.pipe(
        ofType(LocationsActions.hoverLocationOfCharacter),
        debounceTime(debounce, scheduler),
        fromStore(LocationsSelectors.getLocationsEntities)(this.store),
        filter(([{ payload: locationId }, locations]) => !locations[locationId]),
        map(([{ payload: locationId }]) => locationId)
      )
    ).pipe(
      groupBy((id) => id),
      mergeMap((pairs) =>
        pairs.pipe(
          exhaustMap((id) =>
            this.locationsService.getLocation(id).pipe(
              map((location) => LocationsActions.loadDetailsSuccess(fromLocationResponseToLocation(location))),
              catchError((error) => of(LocationsActions.loadDetailsFailure(error)))
            )
          )
        )
      )
    )
  );

  /*
   * Analytics and SEO
   */

  gaTrackOnNewFilter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofRoute('/locations', matchRouteEnter, matchRouteFilter),
        tap(({ queryParams: currentFilter }) =>
          this.googleAnalytics.sendEvent({
            name: 'New Locations Filter',
            category: GAEventCategory.FILTER,
            label: JSON.stringify(currentFilter),
          })
        )
      ),
    { dispatch: false }
  );

  gaTrackOnOpenCharactersDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocationsActions.openCharactersDialog),
        tap(({ payload: location }) =>
          this.googleAnalytics.sendEvent({
            name: 'Open Characters Dialog Of Location',
            category: GAEventCategory.INTERACTION,
            label: location.name,
            value: location.id,
          })
        )
      ),
    { dispatch: false }
  );

  locationsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofRoute('/locations', matchRouteEnter),
        concatMap(({ route }) =>
          of(route).pipe(withLatestFrom(this.translocoService.selectTranslateObject('EPISODES.SEO')))
        ),
        tap(([route, config]) => this.seoService.generateMetaTags({ ...config, route }))
      ),
    { dispatch: false }
  );

  locationsDetailsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocationsActions.loadDetailsSuccess),
        map(({ payload: location }) => location.name),
        concatMap((name) =>
          of(this.router.url).pipe(
            withLatestFrom(
              this.translocoService.selectTranslateObject('EPISODES.SEO_DETAILS', {
                title: { name },
                description: { name },
                'keywords.0': { name },
                'keywords.1': { name },
              })
            )
          )
        ),
        tap(([route, config]) => this.seoService.generateMetaTags({ ...config, route }))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private locationsService: LocationsService,
    private store: Store,
    private router: Router,
    private translocoService: TranslocoService,
    private googleAnalytics: GoogleAnalyticsService,
    private seoService: SeoService
  ) {}
}
