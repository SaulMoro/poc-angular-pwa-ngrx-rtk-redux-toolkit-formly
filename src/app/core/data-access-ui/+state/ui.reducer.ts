import { Action, createReducer, on, createFeatureSelector } from '@ngrx/store';
import * as UiActions from './ui.actions';

export const UI_FEATURE_KEY = 'ui';

export interface UiState {}

export const initialState: UiState = {};

export const reducer = createReducer(initialState);

export const getUiState = createFeatureSelector<UiState>(UI_FEATURE_KEY);
