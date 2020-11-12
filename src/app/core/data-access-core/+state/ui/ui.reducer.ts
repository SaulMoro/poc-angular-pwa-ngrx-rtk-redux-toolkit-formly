import { createReducer, on } from '@ngrx/store';

import * as UiActions from './ui.actions';
import * as CoreActions from '../core.actions';

export const UI_FEATURE_KEY = 'ui';

export interface UiState {
  title: string[]; // for language changes
}

export const initialState: UiState = {
  title: ['APP_TITLE'],
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.newDetailPageTitle, (state, { title }) => ({
    ...state,
    title: [title, 'APP_TITLE'],
  })),
  on(CoreActions.newNavigationData, (state, { data }) => ({
    ...state,
    title: data.title ? [data.title, 'APP_TITLE'] : ['APP_TITLE'],
  }))
);
