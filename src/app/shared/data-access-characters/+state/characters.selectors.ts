import { Params } from '@angular/router';
import { createFeatureSelector, createSelector, createSelectorFactory, resultMemoize } from '@ngrx/store';

import { RouterSelectors } from '@app/core/data-access-router';
import { Character, CharactersFilter, DataState, Episode, PAGE_SIZE } from '@app/shared/models';
import { filterContainsData, isEqual } from '@app/shared/utils';
import { EpisodesSelectors } from '@app/shared/data-access-episodes';
import { LocationsSelectors } from '@app/shared/data-access-locations';
import { charactersAdapter, CHARACTERS_FEATURE_KEY, State } from './characters.reducer';

export const selectCharactersState = createFeatureSelector<State>(CHARACTERS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = charactersAdapter.getSelectors();

export const getDataState = createSelector(selectCharactersState, (state: State) => state?.dataState);

export const getError = createSelector(selectCharactersState, (state: State) => state?.error);

export const getAllCharacters = createSelector(selectCharactersState, (state: State) => state && selectAll(state));

export const getAllCharactersWithFirstEpisode = createSelector(
  getAllCharacters,
  EpisodesSelectors.getEpisodesEntities,
  (characters: Character[], episodes): Character[] =>
    characters.map((character) => ({
      ...character,
      firstEpisode: { ...character.firstEpisode, name: episodes[character.firstEpisode.id]?.name },
    }))
);

export const getCharatersEntities = createSelector(
  selectCharactersState,
  (state: State) => state && selectEntities(state)
);

export const getCharactersIds = createSelector(selectCharactersState, (state: State) => state && selectIds(state));

export const getSelectedId = createSelector(RouterSelectors.getRouteIdParam, (id: string): number => +id);

export const getTotalCharacters = createSelector(selectCharactersState, (state: State) => state?.count);

export const getTotalPages = createSelector(selectCharactersState, (state: State) => state?.pages);

export const getLoadedPages = createSelector(selectCharactersState, (state: State) => state?.loadedPages);

export const getCurrentPage = createSelector(RouterSelectors.getRouteQueryParams, (params: Params): number =>
  params?.page ? +params?.page : 1
);

export const getCharactersOfCurrentPage = createSelector(
  getAllCharactersWithFirstEpisode,
  getCurrentPage,
  (characters: Character[], currentPage: number): Character[] =>
    characters?.filter((character) => character?.page === currentPage)
);

export const getCurrentFilter = createSelector(
  RouterSelectors.getRouteQueryParams,
  (params: Params): CharactersFilter => {
    return (
      params && {
        name: params.name,
        status: params.status,
        species: params.species,
        type: params.type,
        gender: params.gender,
      }
    );
  }
);

export const getCharactersFiltered = createSelector(
  getAllCharactersWithFirstEpisode,
  getCurrentFilter,
  (characters: Character[], filter: CharactersFilter): Character[] => filterContainsData<Character>(characters, filter)
);

export const getCharactersFilteredWithPage = createSelector(
  getCharactersFiltered,
  getCurrentPage,
  (characters: Character[], page: number): Character[] => characters.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
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
    state === DataState.LOADING ? charactersFiltered : characters
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

export const getCharactersOfSelectedEpisode = createSelectorFactory((projector) =>
  resultMemoize(projector, (l1: Character[], l2: Character[]) =>
    isEqual(
      l1?.map((c) => c.id),
      l2?.map((c) => c.id)
    )
  )
)(getAllCharacters, EpisodesSelectors.getSelectedId, (characters: Character[], episodeId: number): Character[] =>
  characters.filter((character) => character.episodes.includes(episodeId))
);

export const getCharactersOfSelectedLocation = createSelectorFactory((projector) =>
  resultMemoize(projector, (l1: Character[], l2: Character[]) =>
    isEqual(
      l1?.map((c) => c.id),
      l2?.map((c) => c.id)
    )
  )
)(getAllCharacters, LocationsSelectors.getSelectedId, (characters: Character[], locationId: number): Character[] =>
  characters.filter((character) => character.location.id === locationId)
);
