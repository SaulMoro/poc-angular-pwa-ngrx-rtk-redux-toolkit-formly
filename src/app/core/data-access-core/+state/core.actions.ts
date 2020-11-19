import { createAction, props } from '@ngrx/store';

export const changeLanguage = createAction('[App Page] Change Language', props<{ lang: string }>());

export const changedTitle = createAction('[App Title Service] Changed Title', props<{ translatedTitle: string }>());

export const enterCharacterDetailsPage = createAction(
  '[Characters Effects] Enter Character Details Page',
  props<{ title: string }>()
);
export const enterLocationDetailsPage = createAction(
  '[Locations Effects] Enter Location Details Page',
  props<{ title: string }>()
);
export const enterEpisodeDetailsPage = createAction(
  '[Episodes Effects] Enter Episode Details Page',
  props<{ title: string }>()
);
