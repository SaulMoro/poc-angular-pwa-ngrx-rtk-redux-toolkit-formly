import { FieldConfig } from './field-config.model';
import { FormOptions } from './form-options.model';

export interface FormConfig {
  formId: string;
  fields: FieldConfig[];
  initialModel?: any;
  filter?: boolean;
  filterOnSubmit?: boolean;
  reset?: boolean;
  disable?: boolean;
  options?: FormOptions;
}

export const generateForm = ({
  formId,
  fields,
  initialModel = {},
  filter = false,
  filterOnSubmit = false,
  reset = false,
  disable = false,
  options = {},
}: FormConfig): FormConfig => {
  return { formId, fields, initialModel, filter, filterOnSubmit, reset, disable, options };
};

export const generateBasicForm = ({ formId, fields, initialModel = {} }: FormConfig): FormConfig =>
  generateForm({ formId, fields, initialModel });

export const generateFilterForm = ({ formId, fields, initialModel = {} }: FormConfig): FormConfig =>
  generateForm({ ...generateBasicForm({ formId, fields, initialModel }), filter: true });

export const generateFilterOnSubmitForm = ({ formId, fields, initialModel = {} }: FormConfig): FormConfig =>
  generateForm({ ...generateBasicForm({ formId, fields, initialModel }), filterOnSubmit: true });
