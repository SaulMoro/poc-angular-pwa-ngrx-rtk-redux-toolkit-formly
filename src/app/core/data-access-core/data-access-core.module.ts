import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
// import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// import * as fromCore from './+state/core.reducer';
import { CoreEffects } from './+state/core.effects';

@NgModule({
  imports: [
    CommonModule,
    TranslocoModule,

    // StoreModule.forFeature(fromCore.CORE_FEATURE_KEY, fromCore.coreReducers),
    EffectsModule.forFeature([CoreEffects]),
  ],
})
export class DataAccessCoreModule {
  constructor() {}
}
