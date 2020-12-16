import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

export interface FormConfig {
  formId: string;
  fields: FormlyFieldConfig[];
  model?: any;
  filter?: boolean;
  filterOnSubmit?: boolean;
  reuse?: boolean;
  disable?: boolean;
  options?: FormlyFormOptions;
}

export const generateForm = ({
  formId,
  fields,
  model = {},
  filter = false,
  filterOnSubmit = false,
  reuse = false,
  disable = false,
  options = {},
}: FormConfig): FormConfig => {
  return { formId, fields, model, filter, filterOnSubmit, reuse, disable, options };
};

export const generateReusableForm = ({ formId, fields, model = {} }: FormConfig): FormConfig =>
  generateForm({ formId, fields, model, reuse: true });

export const generateFilterForm = ({ formId, fields, model = {} }: FormConfig): FormConfig => ({
  ...generateReusableForm({ formId, fields, model }),
  filter: true,
});

export const generateFilterOnSubmitForm = ({ formId, fields, model = {} }: FormConfig): FormConfig => ({
  ...generateReusableForm({ formId, fields, model }),
  filterOnSubmit: true,
});
