import { Action, ActionReducer, MetaReducer, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { settingsReducer, SettingsState, SETTINGS_FEATURE_KEY } from './settings/settings.reducer';
import { UI_FEATURE_KEY, UiState, uiReducer } from './ui/ui.reducer';

export const CORE_FEATURE_KEY = 'core';

export interface CoreState {
  [SETTINGS_FEATURE_KEY]: SettingsState;
  [UI_FEATURE_KEY]: UiState;
}

export const coreReducers: ActionReducerMap<CoreState> = {
  settings: settingsReducer,
  ui: uiReducer,
};

export const localStorageSyncReducer = (reducer: ActionReducer<CoreState>): ActionReducer<CoreState> =>
  localStorageSync({
    keys: [SETTINGS_FEATURE_KEY],
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `${CORE_FEATURE_KEY}_${key}`,
  })(reducer);
export const metaReducers: Array<MetaReducer<CoreState, Action>> = [localStorageSyncReducer];

export const selectCoreState = createFeatureSelector<CoreState>(CORE_FEATURE_KEY);
