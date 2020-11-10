import { createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';
import { CoreState, selectCoreState } from '../core.reducer';

export const getUi = createSelector(selectCoreState, (state: CoreState): UiState => state.ui);

export const getTitle = createSelector(getUi, (ui: UiState) => ui?.title);
