import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of } from 'rxjs';
import { map, debounceTime, switchMap, filter, catchError, mergeMap, takeUntil, tap } from 'rxjs/operators';

import { ofRouteFilter, ofRoutePageChange } from '@app/core/data-access-router';
import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { fromStore } from '@app/shared/utils';
import * as LocationsActions from './locations.actions';
import * as LocationsApiActions from './locations-api.actions';
import * as LocationsSelectors from './locations.selectors';
import { LocationsService } from '../services/locations.service';
import { fromLocationResponsesToLocations, fromLocationResponseToLocation } from '../models/location-response.model';

@Injectable()
export class LocationsEffects {
  filterLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteFilter('/locations'),
      map(({ queryParams, page }) => LocationsActions.filterLocations({ filter: queryParams, page: page || 1 }))
    )
  );

  filterPageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofRoutePageChange('/locations'),
      map(({ queryParams, page }) => LocationsActions.filterPageChange({ filter: queryParams, page }))
    )
  );

  loadLocations$ = createEffect(() =>
    this.actions$.pipe(ofType(LocationsActions.filterLocations, LocationsActions.filterPageChange)).pipe(
      tap(({ filter: currentFilter, page }) =>
        this.googleAnalytics.sendEvent({
          name: 'New Locations Filter',
          category: GAEventCategory.FILTER,
          label: JSON.stringify({ currentFilter, page }),
        })
      ),
      switchMap(({ filter: currentFilter, page }) =>
        this.locationsService.getLocations(currentFilter, page).pipe(
          map(({ info, results }) =>
            LocationsApiActions.loadLocationsSuccess({
              locations: fromLocationResponsesToLocations(results).map((location) => ({
                ...location,
                page,
              })),
              count: info?.count,
              pages: info?.pages,
              page,
            })
          ),
          catchError((error) => of(LocationsApiActions.loadLocationsFailure({ error })))
        )
      )
    )
  );

  prefetchNextPageOfLocations$ = createEffect(() =>
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
              count: info?.count,
              pages: info?.pages,
              page: action.page + 1,
            })
          ),
          catchError((error) => of(LocationsApiActions.prefetchNextLocationsPageFailure({ error })))
        )
      )
    )
  );

  loadLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsActions.enterLocationDetailsPage),
      fromStore(LocationsSelectors.getSelectedId)(this.store),
      switchMap(([, locationId]) =>
        this.locationsService.getLocation(locationId).pipe(
          map((location) =>
            LocationsApiActions.loadLocationSuccess({
              location: fromLocationResponseToLocation(location),
            })
          ),
          catchError((error) => of(LocationsApiActions.loadLocationFailure({ error })))
        )
      )
    )
  );

  prefetchLocation$ = createEffect(() => ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType(LocationsActions.hoverLocationOfCharacter, LocationsActions.hoverLocationOfCharacterDetails),
      debounceTime(debounce, scheduler),
      fromStore(LocationsSelectors.getLocationEntities)(this.store),
      filter(([action, locations]) => !locations[action.locationId]),
      switchMap(([action]) => {
        const loadLocationDetails$ = this.actions$.pipe(
          ofType(LocationsActions.enterLocationDetailsPage, LocationsApiActions.loadLocationSuccess)
        );

        return this.locationsService.getLocation(action.locationId).pipe(
          takeUntil(loadLocationDetails$), // Cancel if Details loaded fast
          map((location) =>
            LocationsApiActions.prefetchLocationSuccess({
              location: fromLocationResponseToLocation(location),
            })
          ),
          catchError((error) => of(LocationsApiActions.prefetchLocationFailure({ error })))
        );
      })
    )
  );

  gaTrackOnOpenCharactersDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocationsActions.openCharactersDialog),
        tap(({ location }) =>
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

  /* showErrorLoadDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsApiActions.loadLocationsFailure, LocationsApiActions.loadLocationFailure),
      exhaustMap(({ error }) =>
        this.dialog
          .open(AlertDialogComponent, {
            data: [!!error.errorMessage ? error.errorMessage : translate('ERRORS.BACKEND'), translate('ERRORS.RETRY')],
          })
          .afterClosed()
      )
    )
  ); */

  constructor(
    private actions$: Actions,
    private store: Store,
    private locationsService: LocationsService,
    private googleAnalytics: GoogleAnalyticsService
  ) {}
}
