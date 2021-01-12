import { createSlice } from '@reduxjs/toolkit';
import { plainWithPayload } from '@app/shared/utils';
import { lsTheme, mediaTheme } from '../utils/helpers';

export interface UiState {
  theme: 'light' | 'dark';
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: lsTheme || mediaTheme,
  } as UiState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    changeLanguage: plainWithPayload<string>(),
  },
});

const { actions: UiActions, name: UI_FEATURE_KEY } = uiSlice;
export default uiSlice;
export { UiActions, UI_FEATURE_KEY };
