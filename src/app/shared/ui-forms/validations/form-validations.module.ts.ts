import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { emailValidator } from './validators/email.validator';
import { phoneValidator } from './validators/phone.validator';
import { dniValidator, spanishIdValidator } from './validators/spanish-id.validator';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      // validationMessages in extensions/translate.extension.ts
      validators: [
        { name: 'email', validation: emailValidator },
        { name: 'phone', validation: phoneValidator },
        { name: 'dni', validation: dniValidator },
        { name: 'spanishId', validation: spanishIdValidator },
      ],
    }),
  ],
})
export class FormValidatorsModule {}
