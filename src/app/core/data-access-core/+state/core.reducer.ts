import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { UI_FEATURE_KEY, UiState, uiReducer } from './ui/ui.reducer';

export const CORE_FEATURE_KEY = 'core';

export interface CoreState {
  [UI_FEATURE_KEY]: UiState;
}

export const coreReducers: ActionReducerMap<CoreState> = {
  ui: uiReducer,
};

export const selectCoreState = createFeatureSelector<CoreState>(CORE_FEATURE_KEY);
