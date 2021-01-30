import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

import charactersReducer, { CHARACTERS_FEATURE_KEY, initialState } from './+state/characters.slice';
import { CharactersEffects } from './+state/characters.effects';

const localStorageSyncReducer = (
  reducer: ActionReducer<ReturnType<typeof charactersReducer>>,
): ActionReducer<ReturnType<typeof charactersReducer>> =>
  localStorageSync({
    keys: Object.keys(initialState),
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `${CHARACTERS_FEATURE_KEY}_${key}`,
  })(reducer);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(CHARACTERS_FEATURE_KEY, charactersReducer, {
      initialState,
      metaReducers: [localStorageSyncReducer],
    }),
    EffectsModule.forFeature([CharactersEffects]),
  ],
})
export class DataAccessCharactersModule {}
