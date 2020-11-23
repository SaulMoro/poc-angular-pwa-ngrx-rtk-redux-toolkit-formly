import { createAction, props } from '@ngrx/store';

export const initForm = createAction(
  '[Forms] Init Form',
  props<{ formId: string; initialModel: any; filter: boolean }>()
);
export const reuseForm = createAction('[Forms] Reuse Form', props<{ formId: string; model: any; filter: boolean }>());
export const removeForm = createAction('[Forms] Remove Form', props<{ formId: string }>());
export const submitForm = createAction(
  '[Forms] Submit Form',
  props<{ formId: string; model: any; initialModel: any; filter: boolean }>()
);
export const manualSubmitForm = createAction(
  '[Forms] Manual Submit Form',
  props<{ formId: string; initialModel: any; filter: boolean }>()
);

export const updateFormModel = createAction(
  '[Forms] Update Form Model',
  props<{ formId: string; model: any; filter: boolean }>()
);
export const updateFormValid = createAction('[Forms] Update Form Valid', props<{ formId: string; valid: boolean }>());

export const resetForm = createAction('[Forms] Reset Form', props<{ formId: string; model: any; filter: boolean }>());
