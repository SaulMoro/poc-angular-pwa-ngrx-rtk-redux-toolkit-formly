import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import * as fromUi from './+state/ui.reducer';
import { UiEffects } from './+state/ui.effects';

import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    // StoreModule.forFeature(fromUi.UI_FEATURE_KEY, fromUi.reducer),
    EffectsModule.forFeature([UiEffects]),
  ],
  declarations: [AlertDialogComponent],
})
export class DataAccessUiModule {
  constructor() {}
}
