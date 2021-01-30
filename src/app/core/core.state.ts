import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { uiReducer, UiState, UI_FEATURE_KEY } from './ui';

export interface RootState {
  router: RouterReducerState;
  [UI_FEATURE_KEY]: UiState;
}

export const reducers: ActionReducerMap<RootState> = {
  router: routerReducer,
  [UI_FEATURE_KEY]: uiReducer,
};
