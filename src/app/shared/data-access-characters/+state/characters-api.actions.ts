import { Character } from '@app/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadCharactersSuccess = createAction(
  '[Characters API] Load Characters Success',
  props<{ characters: Character[]; count: number; pages: number; page: number }>(),
);
export const loadCharactersFailure = createAction('[Characters API] Load Characters Failure', props<{ error: any }>());

export const prefetchNextCharactersPageSuccess = createAction(
  '[Characters API] Prefetch Next Characters Page Success',
  props<{ characters: Character[]; count: number; pages: number; page: number }>(),
);
export const prefetchNextCharactersPageFailure = createAction(
  '[Characters API] Prefetch Next Characters Page Failure',
  props<{ error: any }>(),
);

export const loadCharactersFromIdsSuccess = createAction(
  '[Characters API] Load Characters From Ids Success',
  props<{ characters: Character[] }>(),
);
export const loadCharactersFromIdsFailure = createAction(
  '[Characters API] Load Characters From Ids Failure',
  props<{ error: any }>(),
);

export const loadCharacterSuccess = createAction(
  '[Characters API] Load Character Success',
  props<{ character: Character }>(),
);
export const loadCharacterFailure = createAction('[Characters API] Load Character Failure', props<{ error: any }>());
