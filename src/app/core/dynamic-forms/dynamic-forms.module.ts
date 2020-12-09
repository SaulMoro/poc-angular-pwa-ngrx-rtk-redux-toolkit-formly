import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveComponentModule } from '@ngrx/component';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ValidationsLoader } from './services/validations-loader.service';
import { DataAccessFormsModule } from './data-access-forms';

const EXPORTED_IMPORTS = [ReactiveFormsModule];
const EXPORTED_DECLARATIONS = [DynamicFormComponent];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    ...EXPORTED_IMPORTS,
    CommonModule,
    TranslocoModule,
    ReactiveComponentModule,
    DataAccessFormsModule,

    FormlyModule.forRoot({
      extras: { checkExpressionOn: 'modelChange', immutable: true },
    }),
  ],
  exports: [...EXPORTED_IMPORTS, ...EXPORTED_DECLARATIONS],
})
export class DynamicFormsModule {
  constructor(private validationsLoader: ValidationsLoader) {
    this.validationsLoader.init();
  }
}
