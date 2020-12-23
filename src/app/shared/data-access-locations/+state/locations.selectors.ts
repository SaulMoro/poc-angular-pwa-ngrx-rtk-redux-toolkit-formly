import { Params } from '@angular/router';
import {
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
  defaultMemoize,
  resultMemoize,
} from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { RouterSelectors } from '@app/core/data-access-router';
import { Location, LocationsFilter, DataState, PAGE_SIZE, isLoadingOrRefreshing, isLoading } from '@app/shared/models';
import { argumentsStringifyComparer, filterContainsData, isEqual } from '@app/shared/utils';
import { locationsAdapter, LOCATIONS_FEATURE_KEY, State } from './locations.reducer';

export const selectLocationsState = createFeatureSelector<State>(LOCATIONS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = locationsAdapter.getSelectors();

export const getDataState = createSelector(selectLocationsState, (state: State) => state?.dataState);

export const getLoading = createSelector(getDataState, (state: DataState) => isLoadingOrRefreshing(state));

export const getError = createSelector(selectLocationsState, (state: State): any => getError(state));

export const getAllLocation = createSelector(selectLocationsState, (state: State) => state && selectAll(state));

export const getLocationEntities = createSelector(
  selectLocationsState,
  (state: State) => state && selectEntities(state)
);

export const getLocationsIds = createSelector(selectLocationsState, (state: State) => state && selectIds(state));

export const getSelectedId = createSelector(RouterSelectors.getIdParam, (id: string): number => +id);

export const getTotalLocations = createSelector(selectLocationsState, (state: State) => state?.count);

export const getTotalPages = createSelector(selectLocationsState, (state: State) => state?.pages);

export const getLoadedPages = createSelector(selectLocationsState, (state: State) => state?.loadedPages);
export const getCurrentPage = createSelector(
  RouterSelectors.getCurrentPage,
  (page: number | null): number => page || 1
);

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
  RouterSelectors.getQueryParams,
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
  resultMemoize(projector, (l1: Location[], l2: Location[]) =>
    isEqual(
      l1?.map((l: Location) => l.id),
      l2?.map((l: Location) => l.id)
    )
  )
)(
  getDataState,
  getLocationsFilteredWithPage,
  getLocationsOfCurrentPage,
  (state: DataState, locationsFiltered: Location[], locations: Location[]): Location[] =>
    isLoading(state) ? locationsFiltered : locations
);

/*
 * Location Details Selectors
 */
export const getSelectedLocation = createSelectorFactory((projector) => resultMemoize(projector, isEqual))(
  getLocationEntities,
  getSelectedId,
  (entities: Dictionary<Location>, selectedId: number): Location | undefined => entities[selectedId]
);
