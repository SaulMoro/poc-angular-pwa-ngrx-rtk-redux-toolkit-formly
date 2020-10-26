import { createAction, props } from '@ngrx/store';

export const setAppTitle = createAction('[App Effects] Set App Title', props<{ title: string }>());

export const showErrorDialog = createAction('[App Effects] Show Error Dialog', props<{ message?: string }>());
export const showSuccessSnackBar = createAction('[App Effects] Show Success SnackBar', props<{ message?: string }>());
