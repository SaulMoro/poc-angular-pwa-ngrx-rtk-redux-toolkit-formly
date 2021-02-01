import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { Character, LoadingState, DataState, PaginatedEntity, CharactersFilter } from '@app/shared/models';
import { loadingFailed, loadingStart, plain, plainWithPayload } from '@app/shared/utils';

export interface CharactersState extends EntityState<PaginatedEntity<Character>> {
  dataState: DataState;
  pages: number;
  loadedPages: number[];
}

export const charactersAdapter = createEntityAdapter<PaginatedEntity<Character>>({
  sortComparer: (e1, e2) => e1?.id - e2?.id,
});

export const initialState: CharactersState = charactersAdapter.getInitialState({
  dataState: LoadingState.INIT,
  pages: 0,
  loadedPages: [],
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    enterCharactersPage: plain(),
    enterCharacterDetailsPage: plain(),
    newCharactersFilter: (state, { payload: filter }: PayloadAction<CharactersFilter>) => {
      // Remove the page from entities in state (not in current filter)
      const updates = state.ids.map((id) => ({
        id,
        changes: { page: undefined } as Partial<PaginatedEntity<Character>>,
      }));
      charactersAdapter.updateMany(state, updates);
      state.dataState = LoadingState.LOADING;
      state.pages = 0;
      state.loadedPages = [];
    },
    filterPageChange: plainWithPayload<number>(),
    resetFilter: plain(),

    loadCharactersStart: (state, { payload }: PayloadAction<{ filter: CharactersFilter; page: number }>) =>
      loadingStart(state),
    loadCharactersSuccess: (state, { payload }: PayloadAction<{ data: Character[]; pages: number; page: number }>) => {
      charactersAdapter.upsertMany(state, payload.data);
      state.dataState = LoadingState.LOADED;
      state.pages = payload.pages;
      state.loadedPages = [...state.loadedPages, payload.page];
    },
    loadCharactersFailure: loadingFailed,

    loadCharacterDetailsStart: (state, { payload: id }: PayloadAction<number>) => {
      state.dataState = state.entities[id] ? LoadingState.REFRESHING : LoadingState.LOADING;
    },
    loadCharacterDetailsSuccess: (state, { payload }: PayloadAction<Character>) => {
      charactersAdapter.upsertOne(state, payload);
      state.dataState = LoadingState.LOADED;
    },
    loadCharacterDetailsFailure: loadingFailed,

    loadCharactersFromIdsStart: (state, { payload: ids }: PayloadAction<number[]>) => loadingStart(state),
    loadCharactersFromIdsSuccess: (state, { payload }: PayloadAction<Character[]>) => {
      charactersAdapter.upsertMany(state, payload);
      state.dataState = LoadingState.LOADED;
    },
    loadCharactersFromIdsFailure: loadingFailed,
  },
});

const { reducer: charactersReducer, actions: CharactersActions, name: CHARACTERS_FEATURE_KEY } = charactersSlice;
export default charactersReducer;
export { CharactersActions, CHARACTERS_FEATURE_KEY };
