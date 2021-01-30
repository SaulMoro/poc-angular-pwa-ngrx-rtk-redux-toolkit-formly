import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Form } from './forms.model';

import { FORMS_FEATURE_KEY, FormsState, formsAdapter } from './forms.reducer';

export const selectFormsState = createFeatureSelector<FormsState>(FORMS_FEATURE_KEY);

const { selectAll, selectEntities } = formsAdapter.getSelectors();

export const selectFormsEntities = createSelector(
  selectFormsState,
  (state: FormsState) => state && selectEntities(state),
);

export const selectAllForms = createSelector(selectFormsState, (state: FormsState) => state && selectAll(state));

export const selectForm = createSelector(
  selectFormsEntities,
  (forms: Dictionary<Form>, props: { formId: string }) => forms[props.formId],
);

export const selectFormData = createSelector(
  selectFormsEntities,
  (forms: Dictionary<Form>, props: { formId: string }) => forms[props.formId]?.model,
);

export const selectFormValid = createSelector(
  selectFormsEntities,
  (forms: Dictionary<Form>, props: { formId: string }) => forms[props.formId]?.valid,
);
