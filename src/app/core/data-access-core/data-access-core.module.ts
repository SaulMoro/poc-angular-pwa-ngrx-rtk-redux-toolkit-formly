import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { CoreEffects } from './+state/core.effects';

@NgModule({
  imports: [EffectsModule.forFeature([CoreEffects])],
})
export class DataAccessCoreModule {
  constructor() {}
}
