import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { DynamicFormComponent } from './dynamic-form.component';

// Extensions
import { FormExtensionsModule } from './extensions/form-extensions.module';
// Validators
import { FormValidatorsModule } from './validations/form-validations.module.ts';
// Wrappers
import { FormAddonsModule } from './wrappers/addons/form-addons.module';
import { FormFieldModule } from './wrappers/form-field/form-field.module';
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

    FormlyModule.forRoot({
      extras: { checkExpressionOn: 'modelChange', immutable: true, lazyRender: true },
    }),

    // Extensions
    FormExtensionsModule,
    // Validators
    FormValidatorsModule,
    // Wrappers
    FormAddonsModule,
    FormFieldModule,
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
export class UiFormsModule {}
