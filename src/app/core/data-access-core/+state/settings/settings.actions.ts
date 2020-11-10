import { createAction, props } from '@ngrx/store';
import { Language } from '../../models/settings.model';

export const initLanguage = createAction('[Settings Effects] Init Language', props<{ language: Language }>());

export const changeLanguage = createAction('[App Header] Change Language', props<{ language: Language }>());
