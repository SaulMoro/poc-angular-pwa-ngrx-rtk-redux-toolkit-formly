import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';

import { Character, DataState, ErrorState, LoadingState } from '@app/shared/models';
import { LocationsActions } from '@app/shared/data-access-locations';
import { EpisodesActions } from '@app/shared/data-access-episodes';
import * as CharactersActions from './characters.actions';
import * as CharactersApiActions from './characters-api.actions';

export const CHARACTERS_FEATURE_KEY = 'characters';

export interface State extends EntityState<Character> {
  dataState: DataState;
  count: number;
  pages: number;
  loadedPages: number[];
}

export const charactersAdapter: EntityAdapter<Character> = createEntityAdapter<Character>({
  sortComparer: (c1, c2) => c1?.id - c2?.id,
});

export const initialState: State = charactersAdapter.getInitialState({
  dataState: LoadingState.INIT,
  count: 0,
  pages: 0,
  loadedPages: [],
});

export const charactersReducer = createReducer(
  initialState,
  on(CharactersActions.filterCharacters, (state) =>
    // Remove the page from characters in state (not in current filter)
    charactersAdapter.map((character) => ({ ...character, page: undefined }), {
      ...state,
      dataState: LoadingState.LOADING,
      count: 0,
      pages: 0,
      loadedPages: [],
    }),
  ),
  on(CharactersActions.filterPageChange, (state, { page }) => ({
    ...state,
    dataState: state.loadedPages.includes(page) ? LoadingState.REFRESHING : LoadingState.LOADING,
  })),
  on(CharactersActions.enterCharacterDetailsPage, (state): State => ({ ...state, dataState: LoadingState.LOADING })),

  on(
    LocationsActions.openCharactersDialog,
    LocationsActions.loadLocationDetailsSuccess,
    (state, { payload: location }) =>
      location.residents?.some((characterId) => !state.entities[characterId])
        ? {
            ...state,
            dataState: LoadingState.LOADING,
          }
        : state,
  ),
  on(EpisodesActions.openCharactersDialog, EpisodesActions.loadEpisodeDetailsSuccess, (state, { payload: episode }) =>
    episode.characters?.some((characterId) => !state.entities[characterId])
      ? {
          ...state,
          dataState: LoadingState.LOADING,
        }
      : state,
  ),

  on(
    CharactersApiActions.loadCharactersSuccess,
    CharactersApiActions.prefetchNextCharactersPageSuccess,
    (state, { characters, count, pages, page }) =>
      charactersAdapter.upsertMany(characters, {
        ...state,
        dataState: LoadingState.LOADED,
        count,
        pages,
        loadedPages: state.dataState !== LoadingState.REFRESHING ? [...state.loadedPages, page] : state.loadedPages,
      }),
  ),
  on(CharactersApiActions.loadCharacterSuccess, (state, { character }) =>
    charactersAdapter.upsertOne(character, {
      ...state,
      dataState: LoadingState.LOADED,
    }),
  ),
  on(CharactersApiActions.loadCharactersFromIdsSuccess, (state, { characters }) =>
    charactersAdapter.upsertMany(characters, {
      ...state,
      dataState: LoadingState.LOADED,
    }),
  ),

  on(
    CharactersApiActions.loadCharactersFailure,
    CharactersApiActions.prefetchNextCharactersPageFailure,
    CharactersApiActions.loadCharacterFailure,
    CharactersApiActions.loadCharactersFromIdsFailure,
    (state, { error }): State => ({
      ...state,
      dataState: { error: null } as ErrorState,
    }),
  ),
);

export const localStorageSyncReducer = (reducer: ActionReducer<State>): ActionReducer<State> =>
  localStorageSync({
    keys: Object.keys(initialState),
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `${CHARACTERS_FEATURE_KEY}_${key}`,
  })(reducer);

export const metaReducers: Array<MetaReducer<State, Action>> = [localStorageSyncReducer];
