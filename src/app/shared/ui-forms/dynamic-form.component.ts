import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dynamic-form',
  template: `
    <form novalidate [formGroup]="form" (ngSubmit)="submit($event)">
      <formly-form
        [form]="form"
        [fields]="fields"
        [model]="model"
        [options]="options"
        (modelChange)="modelChange($event)"
      ></formly-form>
      <ng-content></ng-content>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() model: Record<string, unknown> = {};
  @Input() options: FormlyFormOptions = {};
  @Output() modelChanges = new EventEmitter<Record<string, unknown>>();
  @Output() submitForm = new EventEmitter<Record<string, unknown>>();

  modelChange(model: Record<string, unknown>): void {
    this.modelChanges.emit({ ...model });
  }

  submit(model: Record<string, unknown>): void {
    this.submitForm.emit({ ...model });
  }
}
