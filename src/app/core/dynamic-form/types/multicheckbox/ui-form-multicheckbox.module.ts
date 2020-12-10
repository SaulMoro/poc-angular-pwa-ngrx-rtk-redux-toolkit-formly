import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';

import { UiFormMulticheckboxComponent } from './ui-form-multicheckbox.component';

@NgModule({
  declarations: [UiFormMulticheckboxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'multicheckbox',
          component: UiFormMulticheckboxComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormMulticheckboxModule {}
