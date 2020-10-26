import { Action } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { of, OperatorFunction, pipe } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import * as FormsActions from '../+state/forms.actions';

export function ofSubmitForm(
  id: string | string[] | RegExp
): OperatorFunction<Action, ReturnType<typeof FormsActions.submitForm>> {
  return pipe(
    ofType(FormsActions.submitForm),
    filter(({ formId }) =>
      Array.isArray(id) ? id.indexOf(formId) > -1 : id instanceof RegExp ? id.test(formId) : formId === id
    )
  );
}

export function ofUpdateForm(
  id: string | string[] | RegExp
): OperatorFunction<Action, ReturnType<typeof FormsActions.updateFormModel>> {
  return pipe(
    ofType(FormsActions.updateFormModel),
    filter(({ formId }) =>
      Array.isArray(id) ? id.indexOf(formId) > -1 : id instanceof RegExp ? id.test(formId) : formId === id
    )
  );
}

export function ofFilterForm(id: string | string[] | RegExp): OperatorFunction<Action, any> {
  return pipe(
    ofUpdateForm(id),
    // tslint:disable-next-line: no-shadowed-variable
    filter(({ filter }) => !!filter),
    map(({ model }) => model)
  );
}

export function ofInitForm(
  id: string | string[] | RegExp
): OperatorFunction<Action, ReturnType<typeof FormsActions.initForm>> {
  return pipe(
    ofType(FormsActions.initForm),
    filter(({ formId }) =>
      Array.isArray(id) ? id.indexOf(formId) > -1 : id instanceof RegExp ? id.test(formId) : formId === id
    )
  );
}
