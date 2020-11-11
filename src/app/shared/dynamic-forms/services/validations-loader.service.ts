import { FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { TranslocoService } from '@ngneat/transloco';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationsLoader {
  constructor(private translate: TranslocoService, private formlyConfig: FormlyConfig) {}

  init(): void {
    // message without params
    this.formlyConfig.addValidatorMessage('required', (err, field) => this.translate.translate('VALIDATIONS.REQUIRED'));
    this.formlyConfig.addValidatorMessage('email', (err, field) => this.translate.translate('VALIDATIONS.EMAIL'));
    this.formlyConfig.addValidatorMessage('pattern', (err, field) => this.translate.translate('VALIDATIONS.PATTERN'));

    // message with params
    this.formlyConfig.addValidatorMessage('minlength', (err, field) => this.minlengthValidationMessage(err, field));
    this.formlyConfig.addValidatorMessage('maxlength', (err, field) => this.maxlengthValidationMessage(err, field));
    this.formlyConfig.addValidatorMessage('min', (err, field) => this.minValidationMessage(err, field));
    this.formlyConfig.addValidatorMessage('max', (err, field) => this.maxValidationMessage(err, field));
  }

  private minlengthValidationMessage(err, field: FormlyFieldConfig): string {
    return this.translate.translate('VALIDATIONS.MIN_LENGTH', { number: field.templateOptions.minLength });
  }

  private maxlengthValidationMessage(err, field: FormlyFieldConfig): string {
    return this.translate.translate('VALIDATIONS.MAX_LENGTH', { number: field.templateOptions.maxLength });
  }

  private minValidationMessage(err, field: FormlyFieldConfig): string {
    return this.translate.translate('VALIDATIONS.MIN', { number: field.templateOptions.min });
  }

  private maxValidationMessage(err, field: FormlyFieldConfig): string {
    return this.translate.translate('VALIDATIONS.MAX', { number: field.templateOptions.max });
  }
}
