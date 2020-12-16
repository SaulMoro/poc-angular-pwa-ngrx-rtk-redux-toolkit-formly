import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromEpisodes from './+state/episodes.reducer';
import { EpisodesEffects } from './+state/episodes.effects';
import { EpisodesSeoEffects } from './+state/episodes-seo.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromEpisodes.EPISODES_FEATURE_KEY, fromEpisodes.episodesReducer, {
      initialState: fromEpisodes.initialState,
      metaReducers: fromEpisodes.metaReducers,
    }),
    EffectsModule.forFeature([EpisodesEffects, EpisodesSeoEffects]),
  ],
})
export class DataAccessEpisodesModule {
  constructor() {}
}
