import { createAction, props } from '@ngrx/store';
import { Episode } from '@app/shared/models';

export const loadEpisodesSuccess = createAction(
  '[Episodes API] Load Episodes Success',
  props<{ episodes: Episode[]; count: number; pages: number; page: number }>()
);
export const loadEpisodesFailure = createAction('[Episodes API] Load Episodes Failure', props<{ error: any }>());

export const prefetchNextEpisodesPageSuccess = createAction(
  '[Episodes API] Prefetch Next Episodes Page Success',
  props<{ episodes: Episode[]; count: number; pages: number; page: number }>()
);
export const prefetchNextEpisodesPageFailure = createAction(
  '[Episodes API] Prefetch Next Episodes Page Failure',
  props<{ error: any }>()
);

export const loadEpisodesFromIdsSuccess = createAction(
  '[Episodes API] Load Episodes From Ids Success',
  props<{ episodes: Episode[] }>()
);
export const loadEpisodesFromIdsFailure = createAction(
  '[Episodes API] Load Episodes From Ids Failure',
  props<{ error: any }>()
);

export const loadEpisodeSuccess = createAction('[Episodes API] Load Episode Success', props<{ episode: Episode }>());
export const loadEpisodeFailure = createAction('[Episodes API] Load Episode Failure', props<{ error: any }>());
