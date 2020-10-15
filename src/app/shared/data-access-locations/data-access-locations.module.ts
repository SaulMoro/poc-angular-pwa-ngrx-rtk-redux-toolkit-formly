import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { throwIfAlreadyLoaded } from '../utils';
import * as fromLocations from './+state/locations.reducer';
import { LocationsEffects } from './+state/locations.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLocations.LOCATIONS_FEATURE_KEY, fromLocations.locationsReducer, {
      initialState: fromLocations.initialState,
      metaReducers: fromLocations.metaReducers,
    }),
    EffectsModule.forFeature([LocationsEffects]),
  ],
})
export class DataAccessLocationsModule {
  constructor(@Optional() @SkipSelf() parentModule: DataAccessLocationsModule) {
    throwIfAlreadyLoaded(parentModule, DataAccessLocationsModule.name);
  }
}
