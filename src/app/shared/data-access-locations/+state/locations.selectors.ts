import { Params } from '@angular/router';
import { createSelector, createSelectorFactory, defaultMemoize, resultMemoize } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { RouterSelectors } from '@app/core/data-access-router';
import { Location, LocationsFilter, DataState, PAGE_SIZE, isLoadingOrRefreshing } from '@app/shared/models';
import { argumentsStringifyComparer, filterContainsData, isEqual } from '@app/shared/utils';
import { locationsAdapter, selectLocationsState } from './locations.slice';

const { selectAll, selectEntities, selectIds } = locationsAdapter.getSelectors();

export const getDataState = createSelector(selectLocationsState, (state) => state?.dataState);

export const getLoading = createSelector(getDataState, (dataState: DataState) => isLoadingOrRefreshing(dataState));

export const getAllLocations = createSelector(selectLocationsState, (state) => state && selectAll(state));

export const getLocationsEntities = createSelector(selectLocationsState, (state) => state && selectEntities(state));

export const getLocationsIds = createSelector(
  selectLocationsState,
  (state): number[] => state && (selectIds(state) as number[]),
);

export const getSelectedId = createSelector(RouterSelectors.getIdParam, (id: string): number => +id);

export const getTotalPages = createSelector(selectLocationsState, (state) => state?.pages);

export const getLoadedPages = createSelector(selectLocationsState, (state) => state?.loadedPages);

export const getCurrentPage = createSelector(
  RouterSelectors.getCurrentPage,
  (page: number | null): number => page || 1,
);

/*
 * Locations List Selectors
 */
export const getCurrentFilter = createSelector(
  RouterSelectors.getQueryParams,
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

export const getLocations = createSelectorFactory((projector) =>
  resultMemoize(projector, (l1: Location[], l2: Location[]) =>
    isEqual(
      l1?.map((e: Location) => e.id),
      l2?.map((e: Location) => e.id),
    ),
  ),
)(getLocationsFiltered, getCurrentPage, (locations: Location[], page: number): Location[] =>
  locations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
);

/*
 * Location Details Selectors
 */
export const getSelectedLocation = createSelectorFactory((projector) => resultMemoize(projector, isEqual))(
  getLocationsEntities,
  getSelectedId,
  (entities: Dictionary<Location>, selectedId: number): Location | undefined => entities[selectedId],
);
