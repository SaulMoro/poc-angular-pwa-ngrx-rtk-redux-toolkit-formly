import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import * as fromCore from './+state/core.reducer';
import { CoreEffects } from './+state/core.effects';
import { UiEffects } from './+state/ui/ui.effects';

import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [AlertDialogComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    MatDialogModule,
    MatButtonModule,

    StoreModule.forFeature(fromCore.CORE_FEATURE_KEY, fromCore.coreReducers),
    EffectsModule.forFeature([CoreEffects, UiEffects]),
  ],
})
export class DataAccessCoreModule {
  constructor() {}
}
