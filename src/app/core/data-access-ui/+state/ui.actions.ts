import { createAction, props } from '@ngrx/store';

export const changeLanguage = createAction('[App Page] Change Language', props<{ language: string }>());

export const changeTheme = createAction('[App Page] Change Theme', props<{ theme: 'light' | 'dark' }>());
