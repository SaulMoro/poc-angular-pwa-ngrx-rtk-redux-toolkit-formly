import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState, UI_FEATURE_KEY } from './ui.slice';
import { RouterSelectors } from '../router';

export const selectUiState = createFeatureSelector<UiState>(UI_FEATURE_KEY);

export const getTheme = createSelector(selectUiState, (state) => state?.theme);

export const getLanguage = RouterSelectors.selectRouteParam('lang');
