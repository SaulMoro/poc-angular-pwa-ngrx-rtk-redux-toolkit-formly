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
  Episode,
  EpisodesFilter,
  DataState,
  PAGE_SIZE,
  isLoadingOrRefreshing,
  isLoading,
  PaginatedEntity,
} from '@app/shared/models';
import { argumentsStringifyComparer, filterContainsData, isEqual } from '@app/shared/utils';
import { episodesAdapter, EpisodesState, EPISODES_FEATURE_KEY } from './episodes.slice';

export const selectEpisodesState = createFeatureSelector<EpisodesState>(EPISODES_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = episodesAdapter.getSelectors();

export const getDataState = createSelector(selectEpisodesState, (state) => state?.dataState);

export const getLoading = createSelector(getDataState, (dataState: DataState) => isLoadingOrRefreshing(dataState));

export const getAllEpisodes = createSelector(selectEpisodesState, (state) => state && selectAll(state));

export const getEpisodesEntities = createSelector(selectEpisodesState, (state) => state && selectEntities(state));

export const getEpisodesIds = createSelector(
  selectEpisodesState,
  (state): number[] => state && (selectIds(state) as number[]),
);

export const getTotalPages = createSelector(selectEpisodesState, (state) => state?.pages);

export const getLoadedPages = createSelector(selectEpisodesState, (state) => state?.loadedPages);

export const getSelectedId = createSelector(RouterSelectors.selectParamId, (id): number => Number(id));

export const getCurrentPage = createSelector(RouterSelectors.selectCurrentPage, (page: string | undefined): number =>
  page ? +page : 1,
);

/*
 * Episodes List Selectors
 */
export const getEpisodesOfCurrentPage = createSelector(
  getAllEpisodes,
  getCurrentPage,
  (episodes: PaginatedEntity<Episode>[], currentPage: number): Episode[] =>
    episodes?.filter((episode) => episode?.page === currentPage),
);

export const getCurrentFilter = createSelector(
  RouterSelectors.selectQueryParams,
  (params: Params): EpisodesFilter => {
    return (
      params && {
        name: params.name as string,
        episode: params.episode as string,
      }
    );
  },
);

export const getEpisodesFiltered = createSelectorFactory((projection) =>
  defaultMemoize(projection, argumentsStringifyComparer()),
)(getAllEpisodes, getCurrentFilter, (episodes: Episode[], filter: EpisodesFilter): Episode[] =>
  filterContainsData<Episode>(episodes, filter),
);

export const getEpisodesFilteredWithPage = createSelector(
  getEpisodesFiltered,
  getCurrentPage,
  (episodes: Episode[], page: number): Episode[] => episodes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
);

export const getEpisodes = createSelectorFactory((projector) =>
  resultMemoize(projector, (l1: Episode[], l2: Episode[]) =>
    isEqual(
      l1?.map((l: Episode) => l.id),
      l2?.map((l: Episode) => l.id),
    ),
  ),
)(
  getDataState,
  getEpisodesFilteredWithPage,
  getEpisodesOfCurrentPage,
  (dataState: DataState, episodesFiltered: Episode[], episodes: Episode[]): Episode[] =>
    isLoading(dataState) ? episodesFiltered : episodes,
);

/*
 * Episode Details Selectors
 */
export const getSelectedEpisode = createSelectorFactory((projector) => resultMemoize(projector, isEqual))(
  getEpisodesEntities,
  getSelectedId,
  (entities: Dictionary<Episode>, selectedId: number): Episode | undefined => entities[selectedId],
);
