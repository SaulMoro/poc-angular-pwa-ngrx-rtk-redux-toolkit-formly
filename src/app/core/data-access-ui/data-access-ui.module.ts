import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import uiReducer, { UI_FEATURE_KEY } from './+state/ui.slice';
import { UiEffects } from './+state/ui.effects';

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature(UI_FEATURE_KEY, uiReducer), EffectsModule.forFeature([UiEffects])],
})
export class DataAccessUiModule {}
