import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <div class="relative flex items-start">
      <div class="flex items-center h-5">
        <input
          type="checkbox"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600"
          [class.is-invalid]="showError"
          [class.static]="to.formCheck === 'nolabel'"
          [indeterminate]="to.indeterminate && formControl.value == null"
          [formControl]="formControl"
          [formlyAttributes]="field"
        />
      </div>
      <div class="ml-3 text-sm">
        <label *ngIf="to.formCheck !== 'nolabel'" class="font-medium text-gray-700 dark:text-gray-300" [for]="id">
          {{ to.label }}
          <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
        </label>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCheckboxComponent extends FieldType {
  formControl!: FormControl;
  defaultOptions = {
    templateOptions: {
      indeterminate: true,
      hideLabel: true,
      formCheck: 'custom', // 'custom' | 'custom-inline' | 'custom-switch' | 'stacked' | 'inline' | 'nolabel'
    },
  };
}
