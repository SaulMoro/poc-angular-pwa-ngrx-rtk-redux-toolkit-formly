import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';

import { Character, DataState } from '@app/shared/models';
import { LocationsActions, LocationsApiActions } from '@app/shared/data-access-locations';
import { EpisodesActions, EpisodesApiActions } from '@app/shared/data-access-episodes';
import * as CharactersActions from './characters.actions';
import * as CharactersApiActions from './characters-api.actions';

export const CHARACTERS_FEATURE_KEY = 'characters';

export interface State extends EntityState<Character> {
  dataState: DataState;
  count: number;
  pages: number;
  loadedPages: number[];
  error?: any;
}

export const charactersAdapter: EntityAdapter<Character> = createEntityAdapter<Character>({
  sortComparer: (c1, c2) => c1?.id - c2?.id,
});

export const initialState: State = charactersAdapter.getInitialState({
  dataState: DataState.INIT,
  count: 0,
  pages: 0,
  loadedPages: [],
});

export const charactersReducer = createReducer(
  initialState,
  on(CharactersActions.enterCharactersPage, CharactersActions.filterCharacters, (state) =>
    // Remove the page from characters in state (not in current filter)
    charactersAdapter.map((character) => ({ ...character, page: null }), {
      ...state,
      dataState: DataState.LOADING,
      count: 0,
      pages: 0,
      loadedPages: [],
      error: null,
    })
  ),
  on(CharactersActions.filterPageChange, (state, { page }) => ({
    ...state,
    dataState: state.loadedPages.includes(page) ? DataState.REFRESHING : DataState.LOADING,
    error: null,
  })),
  on(CharactersActions.enterCharacterDetailsPage, (state) => ({
    ...state,
    dataState: DataState.LOADING,
    error: null,
  })),

  on(LocationsApiActions.loadLocationSuccess, LocationsActions.hoverLocationLine, (state, { location, type }) =>
    location.residents?.some((characterId) => !state.entities[characterId])
      ? {
          ...state,
          dataState: type === LocationsActions.hoverLocationLine.type ? DataState.PREFETCHING : DataState.LOADING,
          error: null,
        }
      : state
  ),
  on(EpisodesApiActions.loadEpisodeSuccess, EpisodesActions.hoverEpisodeLine, (state, { episode, type }) =>
    episode.characters?.some((characterId) => !state.entities[characterId])
      ? {
          ...state,
          dataState: type === EpisodesActions.hoverEpisodeLine.type ? DataState.PREFETCHING : DataState.LOADING,
          error: null,
        }
      : state
  ),

  on(
    CharactersApiActions.loadCharactersSuccess,
    CharactersApiActions.prefetchNextCharactersPageSuccess,
    (state, { characters, count, pages, page }) =>
      charactersAdapter.upsertMany(characters, {
        ...state,
        dataState: DataState.LOADED,
        count,
        pages,
        loadedPages: state.dataState !== DataState.REFRESHING ? [...state.loadedPages, page] : state.loadedPages,
      })
  ),
  on(CharactersApiActions.loadCharacterSuccess, (state, { character }) =>
    charactersAdapter.upsertOne(character, {
      ...state,
      dataState: DataState.LOADED,
    })
  ),
  on(CharactersApiActions.loadCharactersFromIdsSuccess, (state, { characters }) =>
    charactersAdapter.upsertMany(characters, {
      ...state,
      dataState: DataState.LOADED,
    })
  ),

  on(
    CharactersApiActions.loadCharactersFailure,
    CharactersApiActions.prefetchNextCharactersPageFailure,
    CharactersApiActions.loadCharacterFailure,
    CharactersApiActions.loadCharactersFromIdsFailure,
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
    storageKeySerializer: (key) => `${CHARACTERS_FEATURE_KEY}_${key}`,
  })(reducer);

export const metaReducers: Array<MetaReducer<State, Action>> = [localStorageSyncReducer];
