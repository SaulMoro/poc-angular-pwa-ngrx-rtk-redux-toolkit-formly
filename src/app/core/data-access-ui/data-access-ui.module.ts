import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUi from './+state/ui.reducer';
import { UiEffects } from './+state/ui.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(fromUi.UI_FEATURE_KEY, fromUi.uiReducer, {
      initialState: fromUi.initialState,
      metaReducers: fromUi.metaReducers,
    }),
    EffectsModule.forFeature([UiEffects]),
  ],
})
export class DataAccessUiModule {}
