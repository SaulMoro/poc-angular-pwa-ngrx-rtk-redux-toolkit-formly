import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as FormsSelectors from './forms.selectors';
import * as FormsActions from './forms.actions';

@Injectable()
export class FormsFacade {
  formById$ = (formId: string) => this.store.pipe(select(FormsSelectors.selectFormById, { formId }));
  dataOfForm$ = (formId: string) => this.formById$(formId).pipe(map((form) => form?.model));
  isFormValid$ = (formId: string) => this.formById$(formId).pipe(map((form) => form?.valid));
  fieldOfFormModel$ = (formId: string, field: string) => this.formById$(formId).pipe(map((form) => form?.model[field]));

  constructor(private store: Store) {}

  initForm(formId: string, initialModel: any, filter: boolean = false): void {
    this.store.dispatch(FormsActions.initForm({ formId, initialModel, filter }));
  }

  reuseForm(formId: string, model: any, filter: boolean = false): void {
    this.store.dispatch(FormsActions.reuseForm({ formId, model, filter }));
  }

  removeForm(formId: string): void {
    this.store.dispatch(FormsActions.removeForm({ formId }));
  }

  updateFormModel(formId: string, model: any, filter: boolean = false): void {
    this.store.dispatch(FormsActions.updateFormModel({ formId, model, filter }));
  }

  updateFormValid(formId: string, valid: boolean): void {
    this.store.dispatch(FormsActions.updateFormValid({ formId, valid }));
  }

  submitForm(formId: string, model: any, initialModel: any, filterOnSubmit: boolean = false): void {
    this.store.dispatch(FormsActions.submitForm({ formId, model, initialModel, filter: filterOnSubmit }));
  }

  manualSubmitForm(formId: string, initialModel: any, filterOnSubmit: boolean = false): void {
    this.store.dispatch(FormsActions.manualSubmitForm({ formId, initialModel, filter: filterOnSubmit }));
  }

  resetForm(formId: string, filter: boolean = false): void {
    this.store.dispatch(FormsActions.resetForm({ formId, model: {}, filter }));
  }
}
