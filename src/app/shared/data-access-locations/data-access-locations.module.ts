import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

import locationsReducer, { LOCATIONS_FEATURE_KEY, initialState } from './+state/locations.slice';
import { LocationsEffects } from './+state/locations.effects';

const localStorageSyncReducer = (
  reducer: ActionReducer<ReturnType<typeof locationsReducer>>,
): ActionReducer<ReturnType<typeof locationsReducer>> =>
  localStorageSync({
    keys: Object.keys(initialState),
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `${LOCATIONS_FEATURE_KEY}_${key}`,
  })(reducer);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(LOCATIONS_FEATURE_KEY, locationsReducer, {
      initialState,
      metaReducers: [localStorageSyncReducer],
    }),
    EffectsModule.forFeature([LocationsEffects]),
  ],
})
export class DataAccessLocationsModule {}
