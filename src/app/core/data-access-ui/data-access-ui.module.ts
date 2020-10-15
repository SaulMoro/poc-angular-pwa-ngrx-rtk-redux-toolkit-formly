import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

import { throwIfAlreadyLoaded } from '@app/shared/utils';
import * as fromUi from './+state/ui.reducer';
import { UiEffects } from './+state/ui.effects';

@NgModule({
  imports: [
    TranslateModule,
    StoreModule.forFeature(fromUi.UI_FEATURE_KEY, fromUi.reducer),
    EffectsModule.forFeature([UiEffects]),
  ],
})
export class DataAccessUiModule {
  constructor(@Optional() @SkipSelf() parentModule: DataAccessUiModule) {
    throwIfAlreadyLoaded(parentModule, DataAccessUiModule.name);
  }
}
