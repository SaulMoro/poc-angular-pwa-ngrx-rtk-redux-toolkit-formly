import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { emailValidator } from './types/validation-mail';
import { phoneValidator } from './types/validation-phone';
import { dniValidator, spanishIdValidator } from './types/validation-spanish-id';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      validators: [
        { name: 'email', validation: emailValidator },
        { name: 'phone', validation: phoneValidator },
        { name: 'dni', validation: dniValidator },
        { name: 'spanishId', validation: spanishIdValidator },
      ],
    }),
  ],
})
export class UiFormValidatorsModule {}
