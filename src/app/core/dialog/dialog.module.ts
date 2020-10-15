import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { throwIfAlreadyLoaded } from '@app/shared/utils';
import { DynamicFormsModule } from '@app/core/dynamic-forms';

import { AlertConfirmDialogComponent } from './components/alert-confirm-dialog/alert-confirm-dialog.component';
import { DialogComponent } from './dialog.component';
import { DialogContentDirective } from './directives/dialog-content.directive';
import { CoalescingComponentFactoryResolver } from './services/coalescing-component-factory-resolver.service';
import { DialogService } from './services/dialog.service';

const MATERIAL_MODULES = [MatDialogModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule];

@NgModule({
  declarations: [DialogContentDirective, DialogComponent, AlertConfirmDialogComponent],
  imports: [CommonModule, TranslateModule, FlexLayoutModule, DynamicFormsModule, ...MATERIAL_MODULES],
  exports: [MatDialogModule],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [DialogComponent, AlertConfirmDialogComponent],
})
export class DialogModule {
  static forRoot(): ModuleWithProviders<DialogModule> {
    return {
      ngModule: DialogModule,
      providers: [CoalescingComponentFactoryResolver, DialogService],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: DialogModule) {
    throwIfAlreadyLoaded(parentModule, DialogModule.name);
  }
}
