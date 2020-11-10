import { createAction, props } from '@ngrx/store';
import { Language } from '../../models/settings.model';

export const changeLanguage = createAction('[App Header] Change Language', props<{ language: Language }>());
