import { createAction, props } from '@ngrx/store';

export const changeLanguage = createAction('[App Page] Change Language', props<{ lang: string }>());
