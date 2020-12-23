import { RouterSelectors } from '@app/core/data-access-router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState, UI_FEATURE_KEY } from './ui.slice';

export const selectUiState = createFeatureSelector<UiState>(UI_FEATURE_KEY);

export const getTheme = createSelector(selectUiState, (state) => state?.theme);

export const getLanguage = createSelector(RouterSelectors.getParams, (params) => params?.lang);
