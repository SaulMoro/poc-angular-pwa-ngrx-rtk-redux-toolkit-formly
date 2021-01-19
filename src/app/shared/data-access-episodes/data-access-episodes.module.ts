import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

import episodesReducer, { EPISODES_FEATURE_KEY, initialState } from './+state/episodes.slice';
import { EpisodesEffects } from './+state/episodes.effects';

const localStorageSyncReducer = (
  reducer: ActionReducer<ReturnType<typeof episodesReducer>>,
): ActionReducer<ReturnType<typeof episodesReducer>> =>
  localStorageSync({
    keys: Object.keys(initialState),
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `${EPISODES_FEATURE_KEY}_${key}`,
  })(reducer);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(EPISODES_FEATURE_KEY, episodesReducer, {
      initialState,
      metaReducers: [localStorageSyncReducer],
    }),
    EffectsModule.forFeature([EpisodesEffects]),
  ],
})
export class DataAccessEpisodesModule {}
