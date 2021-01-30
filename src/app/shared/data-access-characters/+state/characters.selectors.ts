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
  Character,
  CharacterGenderStrings,
  CharactersFilter,
  CharacterSpeciesStrings,
  CharacterStatusStrings,
  DataState,
  Episode,
  isLoading,
  isLoadingOrRefreshing,
  PAGE_SIZE,
  PaginatedEntity,
} from '@app/shared/models';
import { argumentsStringifyComparer, filterContainsData, isEqual } from '@app/shared/utils';
import { EpisodesSelectors } from '@app/shared/data-access-episodes';
import { charactersAdapter, CHARACTERS_FEATURE_KEY, CharactersState } from './characters.slice';

export const selectCharactersCharactersState = createFeatureSelector<CharactersState>(CHARACTERS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = charactersAdapter.getSelectors();

export const getDataState = createSelector(
  selectCharactersCharactersState,
  (state: CharactersState) => state?.dataState,
);

export const getLoading = createSelector(getDataState, (state: DataState) => isLoadingOrRefreshing(state));

export const getAllCharacters = createSelector(
  selectCharactersCharactersState,
  (state: CharactersState) => state && selectAll(state),
);

export const getCharatersEntities = createSelector(
  selectCharactersCharactersState,
  (state: CharactersState) => state && selectEntities(state),
);

export const getCharactersIds = createSelector(
  selectCharactersCharactersState,
  (state: CharactersState): number[] => state && (selectIds(state) as number[]),
);

export const getTotalPages = createSelector(selectCharactersCharactersState, (state: CharactersState) => state?.pages);

export const getLoadedPages = createSelector(
  selectCharactersCharactersState,
  (state: CharactersState) => state?.loadedPages,
);

export const getSelectedId = createSelector(RouterSelectors.selectParamId, (id): number => Number(id));

export const getCurrentPage = createSelector(RouterSelectors.selectCurrentPage, (page: string | undefined): number =>
  page ? +page : 1,
);

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
    })),
);

export const getCharactersOfCurrentPage = createSelector(
  getAllCharactersWithFirstEpisode,
  getCurrentPage,
  (characters: PaginatedEntity<Character>[], currentPage: number): Character[] =>
    characters?.filter((character) => character?.page === currentPage),
);

export const getCurrentFilter = createSelector(
  RouterSelectors.selectQueryParams,
  (params: Params): CharactersFilter =>
    params && {
      name: params.name as string,
      status: params.status as CharacterStatusStrings,
      species: params.species as CharacterSpeciesStrings,
      type: params.type as string,
      gender: params.gender as CharacterGenderStrings,
    },
);

export const getCharactersFiltered = createSelectorFactory((projection) =>
  defaultMemoize(projection, argumentsStringifyComparer()),
)(
  getAllCharactersWithFirstEpisode,
  getCurrentFilter,
  (characters: Character[], filter: CharactersFilter): Character[] => filterContainsData<Character>(characters, filter),
);

export const getCharactersFilteredWithPage = createSelector(
  getCharactersFiltered,
  getCurrentPage,
  (characters: Character[], page: number): Character[] => characters?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
);

export const getCharacters = createSelectorFactory((projector) =>
  resultMemoize(
    projector,
    (l1: Character[], l2: Character[]) =>
      isEqual(
        l1?.map((c) => c.id),
        l2?.map((c) => c.id),
      ) && l1.every((c) => !!c.firstEpisode?.name), // Changes if episode name needed
  ),
)(
  getDataState,
  getCharactersFilteredWithPage,
  getCharactersOfCurrentPage,
  (dataState: DataState, charactersFiltered: Character[], characters: Character[]): Character[] =>
    isLoading(dataState) ? charactersFiltered : characters,
);

/*
 * Character Details Selectors
 */
export const getSelectedCharacter = createSelectorFactory((projector) => resultMemoize(projector, isEqual))(
  getCharatersEntities,
  getSelectedId,
  (entities: Dictionary<Character>, selectedId: number): Character | undefined => entities[selectedId],
);

export const getEpisodesOfSelectedCharacter = createSelector(
  getSelectedCharacter,
  EpisodesSelectors.getEpisodesEntities,
  (character: Character, episodes: Dictionary<Episode>): (Episode | undefined)[] =>
    character?.episodes?.map((episodeId) => episodes[episodeId]),
);
