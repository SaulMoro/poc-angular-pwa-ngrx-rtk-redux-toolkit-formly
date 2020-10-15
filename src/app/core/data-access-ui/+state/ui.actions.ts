import { createAction, props } from '@ngrx/store';

export const updateTitle = createAction('[App Effects] Update Title', props<{ title: string }>());

export const showErrorDialog = createAction('[App Effects] Show Error Dialog', props<{ message?: string }>());
export const showSuccessSnackBar = createAction('[App Effects] Show Success SnackBar', props<{ message?: string }>());
