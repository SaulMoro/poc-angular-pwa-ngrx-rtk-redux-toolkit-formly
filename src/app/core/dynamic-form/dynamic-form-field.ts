import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';

export class DynamicFormField implements FormlyFieldConfig {
  static field(
    key: string,
    type?: string,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {}
  ): FormlyFieldConfig {
    return {
      key,
      type,
      templateOptions: {
        ...templateOptions,
      },
      ...config,
    };
  }

  static fieldRow(fieldGroup: FormlyFieldConfig[] = [], fieldGroupClassName: string = 'flex'): FormlyFieldConfig {
    return {
      fieldGroup,
      fieldGroupClassName,
    };
  }

  static input(
    key: string,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {}
  ): FormlyFieldConfig {
    return DynamicFormField.field(key, 'input', templateOptions, config);
  }

  static email(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      type: 'email',
      label: 'Email',
    };
    const defaultOptions = { validators: { validation: ['email'] } };

    return DynamicFormField.input(key, { ...defaults, ...templateOptions }, { ...defaultOptions, ...options });
  }

  static date(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return DynamicFormField.input(key, { ...templateOptions, type: 'date' }, { ...options });
  }

  static datetime(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return DynamicFormField.input(key, { ...templateOptions, type: 'datetime-local' }, { ...options });
  }

  static checkbox(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return DynamicFormField.field(key, 'checkbox', templateOptions, options);
  }

  static multicheckbox(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return DynamicFormField.field(key, 'multicheckbox', templateOptions, options);
  }

  static number(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return DynamicFormField.input(key, { ...templateOptions, type: 'number' }, { ...options });
  }

  static password(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      label: 'Password',
      type: 'password',
      minLength: 8,
      required: true,
    };

    return DynamicFormField.input(key, { ...templateOptions, ...defaults }, options);
  }

  static radio(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return DynamicFormField.field(key, 'radio', templateOptions, options);
  }

  static select(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return DynamicFormField.field(key, 'select', templateOptions, options);
  }
  static textarea(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    const defaultTemplateOptions = { rows: 5 };

    return DynamicFormField.field(key, 'textarea', { ...defaultTemplateOptions, ...templateOptions }, options);
  }

  static time(key: string, templateOptions?: FormlyTemplateOptions, options?: any): FormlyFieldConfig {
    return DynamicFormField.input(key, { ...templateOptions, type: 'time' }, { ...options });
  }

  static template(template: string): FormlyFieldConfig {
    return { type: 'formly-template', template };
  }
}

export interface SelectOption {
  label: string;
  value: string | null;
}
