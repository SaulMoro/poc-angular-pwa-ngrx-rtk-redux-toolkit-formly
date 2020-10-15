import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FormsActions from './forms.actions';
import { FormsEntity } from './forms.models';

export const FORMS_FEATURE_KEY = 'forms';

export interface FormsState extends EntityState<FormsEntity> {}

export interface FormsPartialState {
  readonly [FORMS_FEATURE_KEY]: FormsState;
}

export const formsAdapter: EntityAdapter<FormsEntity> = createEntityAdapter<FormsEntity>({
  selectId: (formsEntity) => formsEntity.formId,
});

export const initialState: FormsState = formsAdapter.getInitialState({});

const formsReducer = createReducer(
  initialState,
  on(FormsActions.initForm, (state, { formId, initialModel }) =>
    formsAdapter.upsertOne(
      { formId, model: { ...initialModel }, valid: false, previousModel: { ...initialModel } },
      state
    )
  ),
  on(FormsActions.removeForm, (state, { formId }) => formsAdapter.removeOne(formId, state)),
  on(FormsActions.updateFormModel, (state, { formId, model }) => {
    // fix for utc dates
    const newModel = { ...model };
    Object.keys(model).forEach((key) => {
      newModel[key] =
        newModel[key] instanceof Date
          ? new Date(Date.UTC(newModel[key].getFullYear(), newModel[key].getMonth(), newModel[key].getDate()))
          : newModel[key];
    });
    return formsAdapter.updateOne(
      {
        id: formId,
        changes: {
          model: { ...state.entities[formId]?.model, ...newModel },
          previousModel: { ...state.entities[formId]?.model },
        },
      },
      state
    );
  }),
  on(FormsActions.updateFormValid, (state, { formId, valid }) =>
    formsAdapter.updateOne({ id: formId, changes: { valid } }, state)
  ),
  on(FormsActions.resetForm, (state, { formId, model }) =>
    formsAdapter.upsertOne({ formId, model, valid: false, previousModel: { ...model } }, state)
  )
);

export function reducer(state: FormsState | undefined, action: Action): FormsState {
  return formsReducer(state, action);
}
