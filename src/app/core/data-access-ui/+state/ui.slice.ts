import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { withPayload } from '@app/shared/utils';
import { lsTheme, mediaTheme } from '../helpers';

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
    changeLanguage: withPayload<string>(),
  },
});

const { reducer: uiReducer, actions: UiActions, name: UI_FEATURE_KEY } = uiSlice;
export default uiReducer;
export { UiActions, UI_FEATURE_KEY };
