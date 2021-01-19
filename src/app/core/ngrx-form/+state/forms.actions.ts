import { createAction, props } from '@ngrx/store';

export const enterFormConfig = createAction(
  '[Forms Component] Enter Form Config',
  props<{ formId: string; model: any; filter: boolean; valid: boolean; reuse: boolean }>(),
);
export const initForm = createAction(
  '[Forms Effects] Init Form',
  props<{ formId: string; model: any; filter: boolean; valid: boolean }>(),
);
export const reuseForm = createAction(
  '[Forms Effects] Reuse Form',
  props<{ formId: string; model: any; filter: boolean }>(),
);

export const updatedFormModel = createAction(
  '[Forms Component] Updated Form Model',
  props<{ formId: string; model: any; previousModel: any; filter: boolean; valid: boolean }>(),
);

export const submittedForm = createAction(
  '[Forms Component] Submitted Form',
  props<{ formId: string; model: any; initialModel: any; filter: boolean }>(),
);
