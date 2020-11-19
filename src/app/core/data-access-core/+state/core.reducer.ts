import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export const CORE_FEATURE_KEY = 'core';

export interface CoreState {}

export const coreReducers: ActionReducerMap<CoreState> = {};

export const selectCoreState = createFeatureSelector<CoreState>(CORE_FEATURE_KEY);
