import { FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { translate } from '@ngneat/transloco';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationsLoader {
  constructor(private formlyConfig: FormlyConfig) {}

  init(): void {
    // message without params
    this.formlyConfig.addValidatorMessage('required', (err, field) => translate('VALIDATIONS.REQUIRED'));
    this.formlyConfig.addValidatorMessage('email', (err, field) => translate('VALIDATIONS.EMAIL'));
    this.formlyConfig.addValidatorMessage('pattern', (err, field) => translate('VALIDATIONS.PATTERN'));

    // message with params
    this.formlyConfig.addValidatorMessage('minlength', (err, field) => this.minlengthValidationMessage(err, field));
    this.formlyConfig.addValidatorMessage('maxlength', (err, field) => this.maxlengthValidationMessage(err, field));
    this.formlyConfig.addValidatorMessage('min', (err, field) => this.minValidationMessage(err, field));
    this.formlyConfig.addValidatorMessage('max', (err, field) => this.maxValidationMessage(err, field));
  }

  private minlengthValidationMessage(err, field: FormlyFieldConfig): string {
    return translate('VALIDATIONS.MIN_LENGTH', { number: field.templateOptions.minLength });
  }

  private maxlengthValidationMessage(err, field: FormlyFieldConfig): string {
    return translate('VALIDATIONS.MAX_LENGTH', { number: field.templateOptions.maxLength });
  }

  private minValidationMessage(err, field: FormlyFieldConfig): string {
    return translate('VALIDATIONS.MIN', { number: field.templateOptions.min });
  }

  private maxValidationMessage(err, field: FormlyFieldConfig): string {
    return translate('VALIDATIONS.MAX', { number: field.templateOptions.max });
  }
}
