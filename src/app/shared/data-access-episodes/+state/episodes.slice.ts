import { createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';

import { Episode, LoadingState } from '@app/shared/models';
import { createGenericPaginatedSlice, plainWithPayload } from '@app/shared/utils';

export const episodesAdapter = createEntityAdapter<Episode>({
  sortComparer: (e1, e2) => e1?.id - e2?.id,
});

const episodesSlice = createGenericPaginatedSlice({
  name: 'episodes',
  entityAdapter: episodesAdapter,
  reducers: {
    requiredCharactersEpisodes: (state, action: PayloadAction<number[]>) => {
      state.dataState = LoadingState.LOADING;
    },
    openCharactersDialog: plainWithPayload<Episode>(),
  },
});

const {
  reducer: episodesReducer,
  actions: EpisodesActions,
  name: EPISODES_FEATURE_KEY,
  initialState,
  featureSelector: selectEpisodesState,
} = episodesSlice;
export default episodesReducer;
export { EpisodesActions, EPISODES_FEATURE_KEY, initialState, selectEpisodesState };
