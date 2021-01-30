import { Params } from '@angular/router';
import {
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
  defaultMemoize,
  resultMemoize,
} from '@ngrx/store';
import { Dictionary } from '@reduxjs/toolkit';

import { RouterSelectors } from '@app/core/router';
import {
  Location,
  LocationsFilter,
  DataState,
  PAGE_SIZE,
  isLoadingOrRefreshing,
  isLoading,
  PaginatedEntity,
} from '@app/shared/models';
import { argumentsStringifyComparer, filterContainsData, isEqual } from '@app/shared/utils';
import { locationsAdapter, LocationsState, LOCATIONS_FEATURE_KEY } from './locations.slice';

export const selectLocationsState = createFeatureSelector<LocationsState>(LOCATIONS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = locationsAdapter.getSelectors();

export const getDataState = createSelector(selectLocationsState, (state) => state?.dataState);

export const getLoading = createSelector(getDataState, (dataState: DataState) => isLoadingOrRefreshing(dataState));

export const getAllLocations = createSelector(selectLocationsState, (state) => state && selectAll(state));

export const getLocationsEntities = createSelector(selectLocationsState, (state) => state && selectEntities(state));

export const getLocationsIds = createSelector(
  selectLocationsState,
  (state): number[] => state && (selectIds(state) as number[]),
);

export const getTotalPages = createSelector(selectLocationsState, (state) => state?.pages);

export const getLoadedPages = createSelector(selectLocationsState, (state) => state?.loadedPages);

export const getSelectedId = createSelector(RouterSelectors.selectParamId, (id): number => Number(id));

export const getCurrentPage = createSelector(RouterSelectors.selectCurrentPage, (page: string | undefined): number =>
  page ? +page : 1,
);

/*
 * Locations List Selectors
 */
export const getLocationsOfCurrentPage = createSelector(
  getAllLocations,
  getCurrentPage,
  (locations: PaginatedEntity<Location>[], currentPage: number): Location[] =>
    locations?.filter((location) => location?.page === currentPage),
);

export const getCurrentFilter = createSelector(
  RouterSelectors.selectQueryParams,
  (params: Params): LocationsFilter => {
    return (
      params && {
        name: params.name as string,
        type: params.type as string,
        dimension: params.dimension as string,
      }
    );
  },
);

export const getLocationsFiltered = createSelectorFactory((projection) =>
  defaultMemoize(projection, argumentsStringifyComparer()),
)(getAllLocations, getCurrentFilter, (locations: Location[], filter: LocationsFilter): Location[] =>
  filterContainsData<Location>(locations, filter),
);

export const getLocationsFilteredWithPage = createSelector(
  getLocationsFiltered,
  getCurrentPage,
  (locations: Location[], page: number): Location[] => locations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
);

export const getLocations = createSelectorFactory((projector) =>
  resultMemoize(projector, (l1: Location[], l2: Location[]) =>
    isEqual(
      l1?.map((l: Location) => l.id),
      l2?.map((l: Location) => l.id),
    ),
  ),
)(
  getDataState,
  getLocationsFilteredWithPage,
  getLocationsOfCurrentPage,
  (dataState: DataState, locationsFiltered: Location[], locations: Location[]): Location[] =>
    isLoading(dataState) ? locationsFiltered : locations,
);

/*
 * Location Details Selectors
 */
export const getSelectedLocation = createSelectorFactory((projector) => resultMemoize(projector, isEqual))(
  getLocationsEntities,
  getSelectedId,
  (entities: Dictionary<Location>, selectedId: number): Location | undefined => entities[selectedId],
);
