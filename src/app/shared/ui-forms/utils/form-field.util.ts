import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { SelectOptions } from './select-option.model';

export type FormTemplateOptions = FormlyTemplateOptions & { translate?: boolean };

export class FormField implements FormlyFieldConfig {
  static fieldRow(fieldGroup: FormlyFieldConfig[] = [], fieldGroupClassName: string = 'flex'): FormlyFieldConfig {
    return { fieldGroup, fieldGroupClassName };
  }

  static field(
    key: string,
    type?: string,
    templateOptions: FormTemplateOptions = {},
    config: FormlyFieldConfig = {},
  ): FormlyFieldConfig {
    const defaults = { translate: true };
    return { key, type, templateOptions: { ...defaults, ...templateOptions }, ...config };
  }

  /*
   * INPUTS
   */

  static input(
    key: string,
    templateOptions: FormTemplateOptions = {},
    config: FormlyFieldConfig = {},
  ): FormlyFieldConfig {
    const defaults = { type: 'text' };
    return this.field(key, 'input', { ...defaults, ...templateOptions }, config);
  }

  static email(key: string, templateOptions?: FormTemplateOptions, config?: FormlyFieldConfig): FormlyFieldConfig {
    const defaults = { type: 'email', label: 'Email' };
    const defaultConfig = { validators: { validation: ['email'] } };
    return this.input(key, { ...defaults, ...templateOptions }, { ...defaultConfig, ...config });
  }

  static date(key: string, templateOptions?: FormTemplateOptions, config?: FormlyFieldConfig): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'date' }, config);
  }

  static datetime(key: string, templateOptions?: FormTemplateOptions, config?: FormlyFieldConfig): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'datetime-local' }, config);
  }

  static number(key: string, templateOptions?: FormTemplateOptions, config?: FormlyFieldConfig): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'number' }, config);
  }

  static password(key: string, templateOptions?: FormTemplateOptions, config?: FormlyFieldConfig): FormlyFieldConfig {
    const defaults = { label: 'Password', type: 'password', minLength: 8, required: true };
    return this.input(key, { ...defaults, ...templateOptions }, config);
  }

  static time(key: string, templateOptions?: FormTemplateOptions, config?: FormlyFieldConfig): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'time' }, config);
  }

  /*
   * FIELDS
   */

  static checkbox(key: string, templateOptions?: FormTemplateOptions, config?: FormlyFieldConfig): FormlyFieldConfig {
    return this.field(key, 'checkbox', templateOptions, config);
  }

  static multicheckbox(
    key: string,
    templateOptions?: FormTemplateOptions,
    config?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(key, 'multicheckbox', templateOptions, config);
  }

  static radio(key: string, templateOptions?: FormTemplateOptions, config?: FormlyFieldConfig): FormlyFieldConfig {
    return this.field(key, 'radio', templateOptions, config);
  }

  static select(
    key: string,
    templateOptions?: FormTemplateOptions,
    options?: SelectOptions,
    config?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(key, 'select', { options, ...templateOptions }, config);
  }

  static textarea(key: string, templateOptions?: FormTemplateOptions, config?: FormlyFieldConfig): FormlyFieldConfig {
    const defaultTemplateOptions = { rows: 5 };
    return this.field(key, 'textarea', { ...defaultTemplateOptions, ...templateOptions }, config);
  }

  /*
   * OTHERS
   */

  static template(template: string): FormlyFieldConfig {
    return { type: 'formly-template', template };
  }
}
