import { createSelector } from '@ngrx/store';
import { SettingsState } from './settings.reducer';
import { selectCoreState } from '../core.reducer';
import { Settings } from '../../models/settings.model';

export const getSettingsState = createSelector(selectCoreState, (state): SettingsState => state.settings);

export const getSelectedLanguage = createSelector(getSettingsState, (settings: Settings) => settings?.language);
