import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <div class="mt-4 space-y-4">
      <ng-container *ngFor="let option of to.options | formlySelectOptions: field | async; let i = index">
        <div class="flex items-center">
          <input
            type="radio"
            class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600"
            [id]="id + '_' + i"
            [name]="field.name || id"
            [class.is-invalid]="showError"
            [attr.value]="option.value"
            [value]="option.value"
            [formControl]="formControl"
            [formlyAttributes]="field"
            [attr.disabled]="option.disabled || formControl.disabled ? true : null"
          />
          <label class="block ml-3 text-sm font-medium text-gray-700 dark:text-gray-300" [for]="id + '_' + i">
            {{ option.label }}
          </label>
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRadioComponent extends FieldType {
  formControl!: FormControl;
  defaultOptions = {
    templateOptions: {
      options: [],
    },
  };
}
