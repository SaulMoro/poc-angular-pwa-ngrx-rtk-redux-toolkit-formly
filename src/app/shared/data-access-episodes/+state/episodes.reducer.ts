import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';

import { Episode, DataState } from '@app/shared/models';
import * as EpisodesActions from './episodes.actions';
import * as EpisodesApiActions from './episodes-api.actions';

export const EPISODES_FEATURE_KEY = 'episodes';

export interface State extends EntityState<Episode> {
  dataState: DataState;
  count: number;
  pages: number;
  loadedPages: number[];
  error?: any;
}

export const episodesAdapter: EntityAdapter<Episode> = createEntityAdapter<Episode>({
  sortComparer: (c1, c2) => c1?.id - c2?.id,
});

export const initialState: State = episodesAdapter.getInitialState({
  dataState: DataState.INIT,
  count: 0,
  pages: 0,
  loadedPages: [],
});

export const episodesReducer = createReducer(
  initialState,
  on(EpisodesActions.filterEpisodes, (state) =>
    // Remove the page from episodes in state (not in current filter)
    episodesAdapter.map((episode) => ({ ...episode, page: null }), {
      ...state,
      dataState: DataState.LOADING,
      count: 0,
      pages: 0,
      loadedPages: [],
      error: null,
    })
  ),
  on(EpisodesActions.filterPageChange, (state, { page }) => ({
    ...state,
    dataState: state.loadedPages.includes(page) ? DataState.REFRESHING : DataState.LOADING,
    error: null,
  })),
  on(EpisodesActions.enterEpisodeDetailsPage, EpisodesActions.requiredCharactersEpisodes, (state) => ({
    ...state,
    dataState: DataState.LOADING,
    error: null,
  })),

  on(
    EpisodesApiActions.loadEpisodesSuccess,
    EpisodesApiActions.prefetchNextEpisodesPageSuccess,
    (state, { episodes, count, pages, page }) =>
      episodesAdapter.upsertMany(episodes, {
        ...state,
        dataState: DataState.LOADED,
        count,
        pages,
        loadedPages: state.dataState !== DataState.REFRESHING ? [...state.loadedPages, page] : state.loadedPages,
      })
  ),
  on(EpisodesApiActions.loadEpisodeSuccess, (state, { episode }) =>
    episodesAdapter.upsertOne(episode, {
      ...state,
      dataState: DataState.LOADED,
    })
  ),
  on(EpisodesApiActions.loadEpisodesFromIdsSuccess, (state, { episodes }) =>
    episodesAdapter.upsertMany(episodes, {
      ...state,
      dataState: DataState.LOADED,
    })
  ),

  on(
    EpisodesApiActions.loadEpisodesFailure,
    EpisodesApiActions.prefetchNextEpisodesPageFailure,
    EpisodesApiActions.loadEpisodeFailure,
    EpisodesApiActions.loadEpisodesFromIdsFailure,
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
    storageKeySerializer: (key) => `${EPISODES_FEATURE_KEY}_${key}`,
  })(reducer);

export const metaReducers: Array<MetaReducer<State, Action>> = [localStorageSyncReducer];
