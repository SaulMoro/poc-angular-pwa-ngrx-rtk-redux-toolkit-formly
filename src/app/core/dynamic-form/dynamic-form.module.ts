import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveComponentModule } from '@ngrx/component';

import { DynamicFormComponent } from './dynamic-form.component';
import { DataAccessFormsModule } from './data-access-forms';

// Extensions
import { FormExtensionsModule } from './extensions/form-extensions.module';
// Wrappers
import { FormAddonsModule } from './wrappers/addons/form-addons.module';
import { FormFieldModule } from './wrappers/form-field/form-field.module';
// Validators
import { FormValidatorsModule } from './validators/form-validators.module';
// Types
import { FormInputModule } from './types/input/form-input.module';
import { FormCheckboxModule } from './types/checkbox/form-checkbox.module';
import { FormMulticheckboxModule } from './types/multicheckbox/form-multicheckbox.module';
import { FormRadioModule } from './types/radio/form-radio.module';
import { FormSelectModule } from './types/select/form-select.module';
import { FormTextareaModule } from './types/textarea/form-textarea.module';

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
    FormExtensionsModule,
    // Wrappers
    FormAddonsModule,
    FormFieldModule,
    // Validators
    FormValidatorsModule,
    // Types (after wrappers)
    FormInputModule,
    FormCheckboxModule,
    FormMulticheckboxModule,
    FormRadioModule,
    FormSelectModule,
    FormTextareaModule,
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {
  constructor() {}
}
