import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as UiActions from './ui.actions';

export const UI_FEATURE_KEY = 'ui';

export interface State {
  theme: 'light' | 'dark';
}

export const initialState: State = {
  theme: window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.changeTheme, (state, { theme }) => ({ ...state, theme }))
);

export const localStorageSyncReducer = (reducer: ActionReducer<State>): ActionReducer<State> =>
  localStorageSync({
    keys: Object.keys(initialState),
    rehydrate: true,
    removeOnUndefined: true,
  })(reducer);

export const metaReducers: Array<MetaReducer<State, Action>> = [localStorageSyncReducer];
