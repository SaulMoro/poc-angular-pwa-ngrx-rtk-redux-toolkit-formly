import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <input
      class="block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
      [ngClass]="{
        'text-red-900 placeholder-red-400 border-red-300 focus:border-red-500 focus:ring-red-500 focus:outline-none': showError
      }"
      [type]="type"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [class.is-invalid]="showError"
    />
  `,
})
export class UiFormInputComponent extends FieldType {
  formControl!: FormControl;

  get type(): string {
    return this.to.type || 'text';
  }
}
