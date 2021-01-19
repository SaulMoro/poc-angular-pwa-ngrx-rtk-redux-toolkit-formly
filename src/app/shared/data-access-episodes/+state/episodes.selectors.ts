import { Params } from '@angular/router';
import { createSelector, createSelectorFactory, defaultMemoize, resultMemoize } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { RouterSelectors } from '@app/core/data-access-router';
import { Episode, EpisodesFilter, DataState, PAGE_SIZE, isLoadingOrRefreshing } from '@app/shared/models';
import { argumentsStringifyComparer, filterContainsData, isEqual } from '@app/shared/utils';
import { episodesAdapter, selectEpisodesState } from './episodes.slice';

const { selectAll, selectEntities, selectIds } = episodesAdapter.getSelectors();

export const getDataState = createSelector(selectEpisodesState, (state) => state?.dataState);

export const getLoading = createSelector(getDataState, (dataState: DataState) => isLoadingOrRefreshing(dataState));

export const getError = createSelector(selectEpisodesState, (state): any => getError(state));

export const getAllEpisodes = createSelector(selectEpisodesState, (state) => state && selectAll(state));

export const getEpisodesEntities = createSelector(selectEpisodesState, (state) => state && selectEntities(state));

export const getEpisodesIds = createSelector(
  selectEpisodesState,
  (state): number[] => state && (selectIds(state) as number[])
);

export const getSelectedId = createSelector(RouterSelectors.getIdParam, (id: string): number => +id);

export const getTotalPages = createSelector(selectEpisodesState, (state) => state?.pages);

export const getLoadedPages = createSelector(selectEpisodesState, (state) => state?.loadedPages);

export const getCurrentPage = createSelector(
  RouterSelectors.getCurrentPage,
  (page: number | null): number => page || 1
);

/*
 * Episodes List Selectors
 */
export const getCurrentFilter = createSelector(
  RouterSelectors.getQueryParams,
  (params: Params): EpisodesFilter => {
    return (
      params && {
        name: params.name,
        episode: params.episode,
      }
    );
  }
);

export const getEpisodesFiltered = createSelectorFactory((projection) =>
  defaultMemoize(projection, argumentsStringifyComparer())
)(getAllEpisodes, getCurrentFilter, (episodes: Episode[], filter: EpisodesFilter): Episode[] =>
  filterContainsData<Episode>(episodes, filter)
);

export const getEpisodes = createSelectorFactory((projector) =>
  resultMemoize(projector, (l1: Episode[], l2: Episode[]) =>
    isEqual(
      l1?.map((e: Episode) => e.id),
      l2?.map((e: Episode) => e.id)
    )
  )
)(getEpisodesFiltered, getCurrentPage, (episodes: Episode[], page: number): Episode[] =>
  episodes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
);

/*
 * Episode Details Selectors
 */
export const getSelectedEpisode = createSelectorFactory((projector) => resultMemoize(projector, isEqual))(
  getEpisodesEntities,
  getSelectedId,
  (entities: Dictionary<Episode>, selectedId: number): Episode | undefined => entities[selectedId]
);
