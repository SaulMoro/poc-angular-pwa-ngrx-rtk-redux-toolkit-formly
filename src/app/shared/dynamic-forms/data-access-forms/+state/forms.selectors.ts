import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FORMS_FEATURE_KEY, FormsState, FormsPartialState, formsAdapter } from './forms.reducer';

// Lookup the 'Forms' feature state managed by NgRx
export const getFormsState = createFeatureSelector<FormsPartialState, FormsState>(FORMS_FEATURE_KEY);

const { selectAll, selectEntities } = formsAdapter.getSelectors();

export const getAllForms = createSelector(getFormsState, (state: FormsState) => selectAll(state));

export const getFormsEntities = createSelector(getFormsState, (state: FormsState) => selectEntities(state));

export const selectFormById = createSelector(getFormsEntities, (entities, props: { formId: string }) => {
  return props?.formId && entities[props.formId];
});

export const selectDataByFormId = createSelector(getFormsEntities, (entities, props: { formId: string }) => {
  return props?.formId && entities[props.formId]?.model;
});
