import { createAction, props } from '@ngrx/store';
import { Episode } from '@app/shared/models';

export const enterEpisodesPage = createAction('[Episodes Navigation] Enter Episodes Page');
export const pageChange = createAction('[Episodes Navigation] Page Change', props<{ page: number }>());
export const enterEpisodeDetailsPage = createAction(
  '[Episodes Navigation] Enter Episode Details Page',
  props<{ episodeId: number }>()
);

export const filterEpisodes = createAction('[Episodes Forms] Filter Episodes');

export const hoverEpisodeLine = createAction('[Episodes Page] Hover Episode Line', props<{ episode: Episode }>());

export const requiredCharactersEpisodes = createAction(
  '[Characters Effects] Required Characters Episodes',
  props<{ episodeIds: number[] }>()
);
