import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';

import { FormMulticheckboxComponent } from './form-multicheckbox.component';

@NgModule({
  declarations: [FormMulticheckboxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'multicheckbox',
          component: FormMulticheckboxComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormMulticheckboxModule {}
