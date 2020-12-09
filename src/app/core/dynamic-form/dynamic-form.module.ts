import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveComponentModule } from '@ngrx/component';

import { DynamicFormComponent } from './dynamic-form.component';
import { DataAccessFormsModule } from './data-access-forms';

// Extensions
import { ExtensionsModule } from './extensions/extensions.module';
// Wrappers
import { UiFormAddonsModule } from './wrappers/addons/ui-form-addons.module';
import { UiFormFieldModule } from './wrappers/form-field/ui-form-field.module';
// Validators
import { UiFormValidatorsModule } from './validators/ui-form-validators.module';
// Types
import { UiFormInputModule } from './types/input/ui-form-input.module';
import { UiFormCheckboxModule } from './types/checkbox/ui-form-checkbox.module';
import { UiFormMulticheckboxModule } from './types/multicheckbox/ui-form-multicheckbox.module';
import { UiFormRadioModule } from './types/radio/ui-form-radio.module';
import { UiFormSelectModule } from './types/select/ui-form-select.module';
import { UiFormTextareaModule } from './types/textarea/ui-form-textarea.module';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    DataAccessFormsModule,

    FormlyModule.forRoot({
      extras: { checkExpressionOn: 'modelChange', immutable: true },
    }),

    // Extensions
    ExtensionsModule,
    // Wrappers
    UiFormAddonsModule,
    UiFormFieldModule,
    // Validators
    UiFormValidatorsModule,
    // Types
    UiFormInputModule,
    UiFormCheckboxModule,
    UiFormMulticheckboxModule,
    UiFormRadioModule,
    UiFormSelectModule,
    UiFormTextareaModule,
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {
  constructor() {}
}
