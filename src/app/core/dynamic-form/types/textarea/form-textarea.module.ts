import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { FormTextareaComponent } from './form-textarea.component';

@NgModule({
  declarations: [FormTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'textarea',
          component: FormTextareaComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormTextareaModule {}
