import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';

import { Location, DataState } from '@app/shared/models';
import * as LocationsActions from './locations.actions';
import * as LocationsApiActions from './locations-api.actions';

export const LOCATIONS_FEATURE_KEY = 'locations';

export interface State extends EntityState<Location> {
  dataState: DataState;
  count: number;
  pages: number;
  loadedPages: number[];
  error?: any;
}

export const locationsAdapter: EntityAdapter<Location> = createEntityAdapter<Location>({
  sortComparer: (c1, c2) => c1.id - c2.id,
});

export const initialState: State = locationsAdapter.getInitialState({
  dataState: DataState.INIT,
  count: 0,
  pages: 0,
  loadedPages: [],
});

export const locationsReducer = createReducer(
  initialState,
  on(LocationsActions.enterLocationsPage, LocationsActions.filterLocations, (state) =>
    // Remove the page from locations in state (not in current filter)
    locationsAdapter.map((location) => ({ ...location, page: null }), {
      ...state,
      dataState: DataState.LOADING,
      count: 0,
      pages: 0,
      loadedPages: [],
      error: null,
    })
  ),
  on(LocationsActions.pageChange, (state, { page }) => ({
    ...state,
    dataState: state.loadedPages.includes(page) ? DataState.REFRESHING : DataState.LOADING,
    error: null,
  })),
  on(LocationsActions.enterLocationDetailsPage, (state, { locationId }) => ({
    ...state,
    dataState: !!state.entities[locationId] ? DataState.REFRESHING : DataState.LOADING,
    error: null,
  })),

  on(
    LocationsActions.hoverLocationOfCharacter,
    LocationsActions.hoverLocationOfCharacterDetails,
    (state, { locationId }) =>
      !state.entities[locationId]
        ? {
            ...state,
            dataState: DataState.PREFETCHING,
            error: null,
          }
        : state
  ),

  on(
    LocationsApiActions.loadLocationsSuccess,
    LocationsApiActions.prefetchNextLocationsPageSuccess,
    (state, { locations, count, pages, page }) =>
      locationsAdapter.upsertMany(locations, {
        ...state,
        dataState: DataState.LOADED,
        count,
        pages,
        loadedPages: state.dataState !== DataState.REFRESHING ? [...state.loadedPages, page] : state.loadedPages,
      })
  ),
  on(LocationsApiActions.loadLocationSuccess, LocationsApiActions.prefetchLocationSuccess, (state, { location }) =>
    locationsAdapter.upsertOne(location, {
      ...state,
      dataState: DataState.LOADED,
    })
  ),

  on(
    LocationsApiActions.loadLocationsFailure,
    LocationsApiActions.prefetchNextLocationsPageFailure,
    LocationsApiActions.loadLocationFailure,
    LocationsApiActions.prefetchLocationFailure,
    (state, { error }) => ({
      ...state,
      dataState: DataState.ERROR,
      error,
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
