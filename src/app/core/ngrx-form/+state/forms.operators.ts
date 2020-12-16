import { Action } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { OperatorFunction, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import * as FormsActions from '../+state/forms.actions';

const isForm = (id: string | string[] | RegExp, formId: string): boolean =>
  Array.isArray(id) ? id.indexOf(formId) > -1 : id instanceof RegExp ? id.test(formId) : formId === id;

export function ofInitForm(
  id: string | string[] | RegExp
): OperatorFunction<Action, ReturnType<typeof FormsActions.initForm>> {
  return pipe(
    ofType(FormsActions.initForm),
    filter(({ formId }) => isForm(id, formId))
  );
}

export function ofUpdateForm(
  id: string | string[] | RegExp
): OperatorFunction<Action, ReturnType<typeof FormsActions.updatedFormModel>> {
  return pipe(
    ofType(FormsActions.updatedFormModel),
    filter(({ formId }) => isForm(id, formId))
  );
}

export function ofSubmitForm(
  id: string | string[] | RegExp
): OperatorFunction<Action, ReturnType<typeof FormsActions.submittedForm>> {
  return pipe(
    ofType(FormsActions.submittedForm),
    filter(({ formId }) => isForm(id, formId))
  );
}

export function ofFilterForm(id: string | string[] | RegExp): OperatorFunction<Action, any> {
  return pipe(
    ofType(FormsActions.initForm, FormsActions.updatedFormModel),
    filter(({ formId, filter: formFilter }) => !!formFilter && isForm(id, formId)),
    map(({ model }) => model)
  );
}
