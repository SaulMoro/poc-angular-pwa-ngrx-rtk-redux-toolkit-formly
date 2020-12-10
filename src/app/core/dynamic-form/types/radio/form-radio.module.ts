import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlySelectModule } from '@ngx-formly/core/select';

import { FormRadioComponent } from './form-radio.component';

@NgModule({
  declarations: [FormRadioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'radio',
          component: FormRadioComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormRadioModule {}
