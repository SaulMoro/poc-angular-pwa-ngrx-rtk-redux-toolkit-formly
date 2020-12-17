import { Params } from '@angular/router';
import {
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
  defaultMemoize,
  resultMemoize,
} from '@ngrx/store';

import { RouterSelectors } from '@app/core/data-access-router';
import {
  Character,
  CharactersFilter,
  DataState,
  Episode,
  isLoading,
  isLoadingOrRefreshing,
  PAGE_SIZE,
} from '@app/shared/models';
import { argumentsStringifyComparer, filterContainsData, isEqual } from '@app/shared/utils';
import { EpisodesSelectors } from '@app/shared/data-access-episodes';
import { charactersAdapter, CHARACTERS_FEATURE_KEY, State } from './characters.reducer';

export const selectCharactersState = createFeatureSelector<State>(CHARACTERS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = charactersAdapter.getSelectors();

export const getDataState = createSelector(selectCharactersState, (state: State) => state?.dataState);

export const getLoading = createSelector(getDataState, (state: DataState) => isLoadingOrRefreshing(state));

export const getError = createSelector(selectCharactersState, (state: State) => getError(state));

export const getAllCharacters = createSelector(selectCharactersState, (state: State) => state && selectAll(state));

export const getCharatersEntities = createSelector(
  selectCharactersState,
  (state: State) => state && selectEntities(state)
);

export const getCharactersIds = createSelector(selectCharactersState, (state: State) => state && selectIds(state));

export const getSelectedId = createSelector(RouterSelectors.getIdParam, (id: string): number => +id);

export const getTotalCharacters = createSelector(selectCharactersState, (state: State) => state?.count);

export const getTotalPages = createSelector(selectCharactersState, (state: State) => state?.pages);

export const getLoadedPages = createSelector(selectCharactersState, (state: State) => state?.loadedPages);

export const getCurrentPage = createSelector(RouterSelectors.getCurrentPage, (page: number): number => page || 1);

/*
 * Characters List Selectors
 */
export const getAllCharactersWithFirstEpisode = createSelector(
  getAllCharacters,
  EpisodesSelectors.getEpisodesEntities,
  (characters: Character[], episodes): Character[] =>
    characters.map((character) => ({
      ...character,
      firstEpisode: { ...character.firstEpisode, name: episodes[character.firstEpisode.id]?.name },
    }))
);

export const getCharactersOfCurrentPage = createSelector(
  getAllCharactersWithFirstEpisode,
  getCurrentPage,
  (characters: Character[], currentPage: number): Character[] =>
    characters?.filter((character) => character?.page === currentPage)
);

export const getCurrentFilter = createSelector(
  RouterSelectors.getQueryParams,
  (params: Params): CharactersFilter =>
    params && {
      name: params.name,
      status: params.status,
      species: params.species,
      type: params.type,
      gender: params.gender,
    }
);

export const getCharactersFiltered = createSelectorFactory((projection) =>
  defaultMemoize(projection, argumentsStringifyComparer())
)(
  getAllCharactersWithFirstEpisode,
  getCurrentFilter,
  (characters: Character[], filter: CharactersFilter): Character[] => filterContainsData<Character>(characters, filter)
);

export const getCharactersFilteredWithPage = createSelector(
  getCharactersFiltered,
  getCurrentPage,
  (characters: Character[], page: number): Character[] => characters?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
);

export const getCharacters = createSelectorFactory((projector) =>
  resultMemoize(
    projector,
    (l1: Character[], l2: Character[]) =>
      isEqual(
        l1?.map((c) => c.id),
        l2?.map((c) => c.id)
      ) && l1.every((c) => !!c.firstEpisode?.name) // Changes if episode name needed
  )
)(
  getDataState,
  getCharactersFilteredWithPage,
  getCharactersOfCurrentPage,
  (state: DataState, charactersFiltered: Character[], characters: Character[]): Character[] =>
    isLoading(state) ? charactersFiltered : characters
);

/*
 * Character Details Selectors
 */
export const getLoadingCharacter = createSelector(
  getLoading,
  EpisodesSelectors.getLoading,
  (loading, loadingEpisodes): boolean => loading || loadingEpisodes
);

export const getSelectedCharacter = createSelectorFactory((projector) => resultMemoize(projector, isEqual))(
  getCharatersEntities,
  getSelectedId,
  (entities, selectedId: number): Character => selectedId && entities[selectedId]
);

export const getEpisodesOfSelectedCharacter = createSelector(
  getSelectedCharacter,
  EpisodesSelectors.getEpisodesEntities,
  (character: Character, episodes): Episode[] => character.episodes?.map((episodeId) => episodes[episodeId])
);
