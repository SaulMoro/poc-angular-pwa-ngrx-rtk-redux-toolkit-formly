import { createAction, props } from '@ngrx/store';

export const changeTheme = createAction('[App Page] Change Theme', props<{ theme: 'light' | 'dark' }>());
