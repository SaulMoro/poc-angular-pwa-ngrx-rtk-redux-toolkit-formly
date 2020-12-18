import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as FormsActions from './+state/forms.actions';
import * as FormsSelectors from './+state/forms.selectors';
import { Form } from './+state/forms.model';
import { FormConfig } from './dynamic-form-config';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dynamic-form',
  template: `
    <form
      *ngrxLet="form$ as form"
      [id]="config.formId"
      [formGroup]="formGroup"
      (ngSubmit)="onSubmitForm(form?.model)"
      novalidate
    >
      <formly-form
        [form]="formGroup"
        [fields]="config.fields"
        [model]="form?.model"
        [options]="config.options"
        (modelChange)="onModelChange($event, form?.model, formGroup?.valid)"
      ></formly-form>
      <ng-content></ng-content>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('form') formGroup = new FormGroup({});
  @Input() config!: FormConfig;
  @Output() submitForm = new EventEmitter<any>();
  @Output() modelChanges = new EventEmitter<any>();

  form$!: Observable<Form | undefined>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (!this.config) {
      throw new TypeError('The input "config" is required');
    }

    this.config?.disable ? this.formGroup.disable() : this.formGroup.enable();

    const { formId, model, filter = false, filterOnSubmit = false, reuse = false } = this.config;
    this.form$ = this.store.select(FormsSelectors.selectForm, { formId });

    this.store.dispatch(
      FormsActions.enterFormConfig({
        formId,
        model,
        filter: filter || filterOnSubmit,
        reuse,
        valid: !this.config.fields?.some((field) => field.templateOptions?.required),
      })
    );
  }

  onModelChange(model: any, previousModel: any, valid: boolean): void {
    const { formId, filter = false } = this.config;
    this.store.dispatch(FormsActions.updatedFormModel({ formId, model, previousModel, filter, valid }));
    this.modelChanges.emit(model);
  }

  onSubmitForm(model: any): void {
    const { model: initialModel, filterOnSubmit: filter = false } = this.config;
    this.store.dispatch(FormsActions.submittedForm({ formId: this.config.formId, model, initialModel, filter }));
    this.submitForm.emit(model);
  }
}
