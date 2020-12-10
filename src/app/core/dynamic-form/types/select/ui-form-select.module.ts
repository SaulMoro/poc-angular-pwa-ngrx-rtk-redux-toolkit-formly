import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';

import { UiFormSelectComponent } from './ui-form-select.component';

@NgModule({
  declarations: [UiFormSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'select',
          component: UiFormSelectComponent,
          wrappers: ['form-field'],
        },
        { name: 'enum', extends: 'select' },
      ],
    }),
  ],
})
export class UiFormSelectModule {}
