import { createAction, props } from '@ngrx/store';
import { Episode, EpisodesFilter } from '@app/shared/models';

export const enterEpisodesPage = createAction('[Episodes Page] Enter Episodes Page');
export const enterEpisodeDetailsPage = createAction('[Episodes Details Page] Enter Episode Details Page');

export const filterEpisodes = createAction(
  '[Episodes Navigation] Filter Episodes',
  props<{ filter: EpisodesFilter; page: number }>()
);
export const filterPageChange = createAction(
  '[Episodes Navigation] Page Change',
  props<{ filter: EpisodesFilter; page: number }>()
);

export const requiredCharactersEpisodes = createAction(
  '[Characters Effects] Required Characters Episodes',
  props<{ episodeIds: number[] }>()
);
