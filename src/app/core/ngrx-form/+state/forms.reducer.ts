import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FormsActions from './forms.actions';
import { Form } from './forms.model';
import { fixDataUTCDates } from './helpers';

export const FORMS_FEATURE_KEY = 'forms';

export interface FormsState extends EntityState<Form> {}

export const formsAdapter: EntityAdapter<Form> = createEntityAdapter<Form>({
  selectId: ({ formId }) => formId,
});

export const initialState: FormsState = formsAdapter.getInitialState({});

export const formsReducer = createReducer(
  initialState,
  on(FormsActions.initForm, (state, { formId, model, valid }) =>
    formsAdapter.addOne({ formId, model, previousModel: { ...model }, valid }, state)
  ),
  on(FormsActions.updatedFormModel, (state, { formId, model, previousModel, valid }) => {
    return formsAdapter.updateOne(
      {
        id: formId,
        changes: {
          model: { ...state.entities[formId]?.model, ...fixDataUTCDates(model) },
          previousModel,
          valid,
        },
      },
      state
    );
  })
);
