import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { Episode, LoadingState, DataState, PaginatedEntity, ErrorState, EpisodesFilter } from '@app/shared/models';
import { plain, plainWithPayload } from '@app/shared/utils';

export interface EpisodesState extends EntityState<PaginatedEntity<Episode>> {
  dataState: DataState;
  pages: number;
  loadedPages: number[];
}

export const episodesAdapter = createEntityAdapter<Episode>({
  sortComparer: (e1, e2) => e1?.id - e2?.id,
});

export const initialState: EpisodesState = episodesAdapter.getInitialState({
  dataState: LoadingState.INIT,
  pages: 0,
  loadedPages: [],
});

const loadingStart = (state: EpisodesState) => {
  state.dataState = LoadingState.LOADING;
};
const loadingFailed = (state: EpisodesState, { payload: error }: PayloadAction<unknown>) => {
  state.dataState = { error } as ErrorState;
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    enterEpisodesPage: plain(),
    enterEpisodeDetailsPage: plain(),
    newEpisodesFilter: (state, { payload: filter }: PayloadAction<EpisodesFilter>) => {
      // Remove the page from entities in state (not in current filter)
      const updates = state.ids.map((id) => ({
        id,
        changes: { page: undefined } as Partial<PaginatedEntity<Episode>>,
      }));
      episodesAdapter.updateMany(state, updates);
      state.dataState = LoadingState.LOADING;
      state.pages = 0;
      state.loadedPages = [];
    },
    changeEpisodesFilterPage: plainWithPayload<number>(),
    requiredEpisodesOfCharacters: plainWithPayload<number[]>(),
    openCharactersDialog: plainWithPayload<Episode>(),

    loadEpisodesStart: (state, { payload }: PayloadAction<{ filter: EpisodesFilter; page: number }>) =>
      loadingStart(state),
    loadEpisodesSuccess: (state, { payload }: PayloadAction<{ data: Episode[]; pages: number; page: number }>) => {
      episodesAdapter.upsertMany(state, payload.data);
      state.dataState = LoadingState.LOADED;
      state.pages = payload.pages;
      state.loadedPages = [...state.loadedPages, payload.page];
    },
    loadEpisodesFailure: loadingFailed,

    loadEpisodeDetailsStart: (state, { payload: id }: PayloadAction<number>) => {
      state.dataState = state.entities[id] ? LoadingState.REFRESHING : LoadingState.LOADING;
    },
    loadEpisodeDetailsSuccess: (state, { payload }: PayloadAction<Episode>) => {
      episodesAdapter.upsertOne(state, payload);
      state.dataState = LoadingState.LOADED;
    },
    loadEpisodeDetailsFailure: loadingFailed,

    loadEpisodesFromIdsStart: (state, { payload: ids }: PayloadAction<number[]>) => loadingStart(state),
    loadEpisodesFromIdsSuccess: (state, { payload }: PayloadAction<Episode[]>) => {
      episodesAdapter.upsertMany(state, payload);
      state.dataState = LoadingState.LOADED;
    },
    loadEpisodesFromIdsFailure: loadingFailed,
  },
});

const { reducer: episodesReducer, actions: EpisodesActions, name: EPISODES_FEATURE_KEY } = episodesSlice;
export default episodesReducer;
export { EpisodesActions, EPISODES_FEATURE_KEY };
