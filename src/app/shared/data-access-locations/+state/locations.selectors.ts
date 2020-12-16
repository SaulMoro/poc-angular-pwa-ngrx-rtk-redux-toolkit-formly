import { Params } from '@angular/router';
import {
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
  defaultMemoize,
  resultMemoize,
} from '@ngrx/store';

import { RouterSelectors } from '@app/core/data-access-router';
import { Location, LocationsFilter, DataState, PAGE_SIZE } from '@app/shared/models';
import { argumentsStringifyComparer, filterContainsData, isEqual } from '@app/shared/utils';
import { locationsAdapter, LOCATIONS_FEATURE_KEY, State } from './locations.reducer';

export const selectLocationsState = createFeatureSelector<State>(LOCATIONS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = locationsAdapter.getSelectors();

export const getDataState = createSelector(selectLocationsState, (state: State) => state?.dataState);

export const getLoading = createSelector(
  getDataState,
  (state: DataState) => state === DataState.LOADING || state === DataState.REFRESHING
);

export const getError = createSelector(selectLocationsState, (state: State) => state?.error);

export const getAllLocation = createSelector(selectLocationsState, (state: State) => state && selectAll(state));

export const getLocationEntities = createSelector(
  selectLocationsState,
  (state: State) => state && selectEntities(state)
);

export const getLocationsIds = createSelector(selectLocationsState, (state: State) => state && selectIds(state));

export const getSelectedId = createSelector(RouterSelectors.getRouteIdParam, (id: string): number => +id);

export const getTotalLocations = createSelector(selectLocationsState, (state: State) => state?.count);

export const getTotalPages = createSelector(selectLocationsState, (state: State) => state?.pages);

export const getLoadedPages = createSelector(selectLocationsState, (state: State) => state?.loadedPages);

export const getCurrentPage = createSelector(RouterSelectors.getCurrentPage, (page: number): number => page || 1);

/*
 * Locations List Selectors
 */
export const getLocationsOfCurrentPage = createSelector(
  getAllLocation,
  getCurrentPage,
  (locations: Location[], currentPage: number): Location[] =>
    locations?.filter((location) => location?.page === currentPage)
);

export const getCurrentFilter = createSelector(
  RouterSelectors.getRouteQueryParams,
  (params: Params): LocationsFilter => {
    return (
      params && {
        name: params.name,
        type: params.type,
        dimension: params.dimension,
      }
    );
  }
);

export const getLocationsFiltered = createSelectorFactory((projection) =>
  defaultMemoize(projection, argumentsStringifyComparer())
)(getAllLocation, getCurrentFilter, (locations: Location[], filter: LocationsFilter): Location[] =>
  filterContainsData<Location>(locations, filter)
);

export const getLocationsFilteredWithPage = createSelector(
  getLocationsFiltered,
  getCurrentPage,
  (locations: Location[], page: number): Location[] => locations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
);

export const getLocations = createSelectorFactory((projector) =>
  resultMemoize(projector, (l1, l2) =>
    isEqual(
      l1?.map((c) => c.id),
      l2?.map((c) => c.id)
    )
  )
)(
  getDataState,
  getLocationsFilteredWithPage,
  getLocationsOfCurrentPage,
  (state: DataState, locationsFiltered: Location[], locations: Location[]): Location[] =>
    state === DataState.LOADING ? locationsFiltered : locations
);

/*
 * Location Details Selectors
 */
export const getSelectedLocation = createSelectorFactory((projector) => resultMemoize(projector, isEqual))(
  getLocationEntities,
  getSelectedId,
  (entities, selectedId: number): Location => selectedId && entities[selectedId]
);
