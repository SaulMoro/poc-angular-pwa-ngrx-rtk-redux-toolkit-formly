import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import * as fromCore from './+state/core.reducer';
import { CoreEffects } from './+state/core.effects';
import { SettingsEffects } from './+state/settings/settings.effects';

import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { UiEffects } from './+state/ui/ui.effects';

@NgModule({
  declarations: [AlertDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,

    StoreModule.forFeature(fromCore.CORE_FEATURE_KEY, fromCore.coreReducers, {
      metaReducers: fromCore.metaReducers,
    }),
    EffectsModule.forFeature([CoreEffects, SettingsEffects, UiEffects]),
  ],
})
export class DataAccessCoreModule {
  constructor() {}
}
