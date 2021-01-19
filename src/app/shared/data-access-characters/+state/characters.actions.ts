import { createAction, props } from '@ngrx/store';
import { CharactersFilter } from '@app/shared/models';

export const enterCharactersPage = createAction('[Characters Page] Enter Characters Page');
export const enterCharacterDetailsPage = createAction('[Characters Details Page] Enter Character Details Page');

export const filterCharacters = createAction(
  '[Characters Navigation] Filter Characters',
  props<{ filter: CharactersFilter; page: number }>(),
);
export const filterPageChange = createAction(
  '[Characters Navigation] Page Change',
  props<{ filter: CharactersFilter; page: number }>(),
);
