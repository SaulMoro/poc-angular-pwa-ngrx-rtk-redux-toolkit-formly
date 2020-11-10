import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of } from 'rxjs';
import { map, debounceTime, exhaustMap, switchMap, filter, catchError, mergeMap, takeUntil } from 'rxjs/operators';

import { ofRouteEnter, ofRouteFilter, ofRoutePageChange } from '@app/core/data-access-router';
import { UiActions } from '@app/core/data-access-core';
import { ofFilterForm } from '@app/shared/dynamic-forms';
import { FormIds } from '@app/shared/models';
import { fromStore } from '@app/shared/ngrx-utils';
import * as LocationsActions from './locations.actions';
import * as LocationsApiActions from './locations-api.actions';
import * as LocationsSelectors from './locations.selectors';
import { LocationsService } from '../services/locations.service';
import { fromLocationResponsesToLocations, fromLocationResponseToLocation } from '../models/location-response.model';

@Injectable()
export class LocationsEffects {
  enterLocationsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteEnter('/locations'),
      map(() => LocationsActions.enterLocationsPage())
    )
  );

  pageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofRoutePageChange('/locations'),
      map((page) => LocationsActions.pageChange({ page }))
    )
  );

  enterLocationDetailsOnNav$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteEnter('/locations/:id'),
      map(({ params }) => params?.id),
      map((locationId: number) => LocationsActions.enterLocationDetailsPage({ locationId }))
    )
  );

  filterLocations$ = createEffect(() => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      // ofRouteFilter('/locations'), // (Same function)
      ofFilterForm(FormIds.FORM_LOCATIONS_FILTER_ID),
      debounceTime(debounce, scheduler),
      switchMap(() =>
        // Reset Filter Page
        this.router.navigate([], {
          queryParams: { page: null },
          queryParamsHandling: 'merge',
        })
      ),
      map(() => LocationsActions.filterLocations())
    )
  );

  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsActions.enterLocationsPage, LocationsActions.pageChange, LocationsActions.filterLocations),
      fromStore(LocationsSelectors.getCurrentFilter, LocationsSelectors.getCurrentPage)(this.store),
      switchMap(([, currentFilter, page]) =>
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
      switchMap(({ locationId }) =>
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

  updateTitleOnLoadLocationDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsApiActions.loadLocationSuccess),
      map(({ location }) => UiActions.setAppTitle({ title: location.name }))
    )
  );

  showErrorLoadDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsApiActions.loadLocationsFailure, LocationsApiActions.loadLocationFailure),
      exhaustMap(({ error }) =>
        of(UiActions.showErrorDialog(!!error.errorMessage ? { message: error.errorMessage } : {}))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private locationsService: LocationsService,
    private router: Router
  ) {}
}
