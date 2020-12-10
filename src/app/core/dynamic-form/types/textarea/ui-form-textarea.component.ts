import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <textarea
      [formControl]="formControl"
      [cols]="to.cols"
      [rows]="to.rows"
      class="block w-full border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
      [class.is-invalid]="showError"
      [formlyAttributes]="field"
    >
    </textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormTextareaComponent extends FieldType {
  formControl!: FormControl;
  defaultOptions = {
    templateOptions: {
      cols: 1,
      rows: 1,
    },
  };
}
