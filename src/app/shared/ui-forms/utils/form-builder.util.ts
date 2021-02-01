import { FormField } from './form-field.util';

// TODO:
export const formBuilder = (fieldGroup: FormField[] = []): { fields: FormField[]; options: any } => {
  return { fields: fieldGroup, options: null };
};
