import { createAction, props } from '@ngrx/store';
import { Location } from '@app/shared/models';

export const loadLocationsSuccess = createAction(
  '[Locations API] Load Locations Success',
  props<{ locations: Location[]; count: number; pages: number; page: number }>()
);
export const loadLocationsFailure = createAction('[Locations API] Load Locations Failure', props<{ error: any }>());

export const prefetchNextLocationsPageSuccess = createAction(
  '[Locations API] Prefetch Next Locations Page Success',
  props<{ locations: Location[]; count: number; pages: number; page: number }>()
);
export const prefetchNextLocationsPageFailure = createAction(
  '[Locations API] Prefetch Next Locations Page Failure',
  props<{ error: any }>()
);

export const loadLocationSuccess = createAction(
  '[Locations API] Load Location Success',
  props<{ location: Location }>()
);
export const loadLocationFailure = createAction('[Locations API] Load Location Failure', props<{ error: any }>());

export const prefetchLocationSuccess = createAction(
  '[Locations API] Prefetch Location Success',
  props<{ location: Location }>()
);
export const prefetchLocationFailure = createAction(
  '[Locations API] Prefetch Location Failure',
  props<{ error: any }>()
);
