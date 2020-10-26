import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { throwIfAlreadyLoaded } from '../utils';
import { FormsEffects } from './+state/forms.effects';
import { FormsFacade } from './+state/forms.facade';
import * as fromForms from './+state/forms.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromForms.FORMS_FEATURE_KEY, fromForms.reducer),
    EffectsModule.forFeature([FormsEffects]),
  ],
  providers: [FormsFacade],
})
export class DataAccessFormsModule {
  constructor(@Optional() @SkipSelf() parentModule: DataAccessFormsModule) {
    throwIfAlreadyLoaded(parentModule, DataAccessFormsModule.name);
  }
}
