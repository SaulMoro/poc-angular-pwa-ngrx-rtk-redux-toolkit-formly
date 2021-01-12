import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import uiSlice from './+state/ui.slice';
import { UiEffects } from './+state/ui.effects';

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature(uiSlice), EffectsModule.forFeature([UiEffects])],
})
export class DataAccessUiModule {}
