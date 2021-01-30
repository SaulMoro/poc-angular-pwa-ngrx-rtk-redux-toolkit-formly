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
  concatMap,
  withLatestFrom,
  filter,
  debounceTime,
  groupBy,
  exhaustMap,
} from 'rxjs/operators';

import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { SeoService } from '@app/core/seo';
import { fromStore } from '@app/shared/utils';
import { LocationsActions } from './locations.slice';
import * as LocationsSelectors from './locations.selectors';
import { LocationsService } from '../services/locations.service';
import { fromLocationResponsesToLocations, fromLocationResponseToLocation } from '../models/location-response.model';

@Injectable()
export class LocationsEffects {
  loadLocationsStart$ = createEffect(() =>
    merge(
      this.actions$.pipe(
        ofType(LocationsActions.enterLocationsPage),
        fromStore(LocationsSelectors.getCurrentFilter, LocationsSelectors.getCurrentPage)(this.store),
        map(([, filter, page]) => ({ filter, page })),
      ),
      this.actions$.pipe(
        ofType(LocationsActions.newLocationsFilter),
        map(({ payload: filter }) => ({ filter, page: 1 })),
      ),
      this.actions$.pipe(
        ofType(LocationsActions.changeLocationsFilterPage),
        fromStore(LocationsSelectors.getLoadedPages, LocationsSelectors.getCurrentFilter)(this.store),
        filter(([{ payload: page }, loadedPages]) => !loadedPages.includes(page)),
        map(([{ payload: page }, , filter]) => ({ filter, page })),
      ),
    ).pipe(map(LocationsActions.loadLocationsStart)),
  );

  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsActions.loadLocationsStart),
      switchMap(({ payload: { filter, page } }) =>
        this.locationsService.getLocations(filter, page).pipe(
          map(({ info, results }) =>
            LocationsActions.loadLocationsSuccess({
              data: fromLocationResponsesToLocations(results).map((location) => ({
                ...location,
                page,
              })),
              pages: info?.pages || page,
              page,
            }),
          ),
          catchError((error: unknown) => of(LocationsActions.loadLocationsFailure(error))),
        ),
      ),
    ),
  );

  loadLocationDetailsStart$ = createEffect(() => ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    merge(
      this.actions$.pipe(
        ofType(LocationsActions.enterLocationDetailsPage),
        fromStore(LocationsSelectors.getSelectedId)(this.store),
        map(([, locationId]) => locationId),
      ),
      this.actions$.pipe(
        ofType(LocationsActions.hoverLocationOfCharacter),
        debounceTime(debounce, scheduler),
        fromStore(LocationsSelectors.getLocationsEntities)(this.store),
        filter(([{ payload: locationId }, locations]) => !locations[locationId]),
        map(([{ payload: locationId }]) => locationId),
      ),
    ).pipe(map(LocationsActions.loadLocationDetailsStart)),
  );

  loadLocationDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsActions.loadLocationDetailsStart),
      groupBy(({ payload: locationId }) => locationId),
      switchMap((pairs) =>
        // Avoid multiple calls in parallel to the same locationId
        pairs.pipe(
          exhaustMap(({ payload: locationId }) =>
            this.locationsService.getLocation(locationId).pipe(
              map((location) => LocationsActions.loadLocationDetailsSuccess(fromLocationResponseToLocation(location))),
              catchError((error: unknown) => of(LocationsActions.loadLocationDetailsFailure(error))),
            ),
          ),
        ),
      ),
    ),
  );

  /*
   * Analytics and SEO
   */

  gaTrackOnNewFilter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocationsActions.loadLocationsStart),
        map(({ payload: { filter, page } }) =>
          this.googleAnalytics.sendEvent({
            name: 'New Locations Filter',
            category: GAEventCategory.FILTER,
            label: JSON.stringify({ filter, page }),
          }),
        ),
      ),
    { dispatch: false },
  );

  gaTrackOnOpenCharactersDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocationsActions.openCharactersDialog),
        map(({ payload: location }) =>
          this.googleAnalytics.sendEvent({
            name: 'Open Characters Dialog Of Location',
            category: GAEventCategory.INTERACTION,
            label: location.name,
            value: location.id,
          }),
        ),
      ),
    { dispatch: false },
  );

  locationsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocationsActions.enterLocationsPage),
        concatMap(() =>
          of(this.router.url).pipe(withLatestFrom(this.translocoService.selectTranslateObject('EPISODES.SEO'))),
        ),
        map(([route, config]) => this.seoService.generateMetaTags({ ...config, route })),
      ),
    { dispatch: false },
  );

  locationsDetailsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocationsActions.loadLocationDetailsSuccess),
        filter(() => this.router.url.includes('/locations')),
        map(({ payload: location }) => location.name),
        concatMap((name) =>
          of(this.router.url).pipe(
            withLatestFrom(
              this.translocoService.selectTranslateObject('EPISODES.SEO_DETAILS', {
                title: { name },
                description: { name },
                'keywords.0': { name },
                'keywords.1': { name },
              }),
            ),
          ),
        ),
        map(([route, config]) => this.seoService.generateMetaTags({ ...config, route })),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private locationsService: LocationsService,
    private store: Store,
    private router: Router,
    private translocoService: TranslocoService,
    private googleAnalytics: GoogleAnalyticsService,
    private seoService: SeoService,
  ) {}
}
