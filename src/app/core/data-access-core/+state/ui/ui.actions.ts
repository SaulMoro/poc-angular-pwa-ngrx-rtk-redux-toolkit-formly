import { createAction, props } from '@ngrx/store';

export const changeLanguage = createAction('[App Page] Change Language', props<{ lang: string }>());

export const newDetailPageTitle = createAction('[App Effects] New Detail Page Title', props<{ title: string }>());

export const showErrorDialog = createAction('[App Effects] Show Error Dialog', props<{ message?: string }>());
export const showSuccessSnackBar = createAction('[App Effects] Show Success SnackBar', props<{ message?: string }>());
