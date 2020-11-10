import { createReducer, on } from '@ngrx/store';

import * as SettingsActions from './settings.actions';
import { Settings } from '../../models/settings.model';

export const SETTINGS_FEATURE_KEY = 'settings';

export interface SettingsState extends Settings {}

export const initialState: SettingsState = {
  language: null,
};

export const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.initLanguage, SettingsActions.changeLanguage, (state, { language }) => ({
    ...state,
    language,
  }))
);
