import { createAction, props } from '@ngrx/store';

export const enterCharactersPage = createAction('[Characters Navigation] Enter Characters Page');
export const pageChange = createAction('[Characters Navigation] Page Change', props<{ page: number }>());
export const enterCharacterDetailsPage = createAction(
  '[Characters Navigation] Enter Character Details Page',
  props<{ characterId: number }>()
);

export const filterCharacters = createAction('[Characters Forms] Filter Characters');
