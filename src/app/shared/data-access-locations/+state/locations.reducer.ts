import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';

import { Location, DataState, LoadingState } from '@app/shared/models';
import * as LocationsActions from './locations.actions';
import * as LocationsApiActions from './locations-api.actions';

export const LOCATIONS_FEATURE_KEY = 'locations';

export interface State extends EntityState<Location> {
  dataState: DataState;
  count: number;
  pages: number;
  loadedPages: number[];
}

export const locationsAdapter: EntityAdapter<Location> = createEntityAdapter<Location>({
  sortComparer: (c1, c2) => c1?.id - c2?.id,
});

export const initialState: State = locationsAdapter.getInitialState({
  dataState: LoadingState.INIT,
  count: 0,
  pages: 0,
  loadedPages: [],
});

export const locationsReducer = createReducer(
  initialState,
  on(LocationsActions.filterLocations, (state) =>
    // Remove the page from locations in state (not in current filter)
    locationsAdapter.map((location) => ({ ...location, page: null }), {
      ...state,
      dataState: LoadingState.LOADING,
      count: 0,
      pages: 0,
      loadedPages: [],
    })
  ),
  on(LocationsActions.filterPageChange, (state, { page }) => ({
    ...state,
    dataState: state.loadedPages.includes(page) ? LoadingState.REFRESHING : LoadingState.LOADING,
  })),
  on(LocationsActions.enterLocationDetailsPage, (state) => ({
    ...state,
    dataState: LoadingState.LOADING,
  })),

  on(
    LocationsActions.hoverLocationOfCharacter,
    LocationsActions.hoverLocationOfCharacterDetails,
    (state, { locationId }) =>
      !state.entities[locationId]
        ? {
            ...state,
            dataState: LoadingState.PREFETCHING,
          }
        : state
  ),

  on(
    LocationsApiActions.loadLocationsSuccess,
    LocationsApiActions.prefetchNextLocationsPageSuccess,
    (state, { locations, count, pages, page }) =>
      locationsAdapter.upsertMany(locations, {
        ...state,
        dataState: LoadingState.LOADED,
        count,
        pages,
        loadedPages: state.dataState !== LoadingState.REFRESHING ? [...state.loadedPages, page] : state.loadedPages,
      })
  ),
  on(LocationsApiActions.loadLocationSuccess, LocationsApiActions.prefetchLocationSuccess, (state, { location }) =>
    locationsAdapter.upsertOne(location, {
      ...state,
      dataState: LoadingState.LOADED,
    })
  ),

  on(
    LocationsApiActions.loadLocationsFailure,
    LocationsApiActions.prefetchNextLocationsPageFailure,
    LocationsApiActions.loadLocationFailure,
    LocationsApiActions.prefetchLocationFailure,
    (state, { error }) => ({
      ...state,
      dataState: { error },
    })
  )
);

export const localStorageSyncReducer = (reducer: ActionReducer<State>): ActionReducer<State> =>
  localStorageSync({
    keys: Object.keys(initialState),
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `${LOCATIONS_FEATURE_KEY}_${key}`,
  })(reducer);

export const metaReducers: Array<MetaReducer<State, Action>> = [localStorageSyncReducer];
