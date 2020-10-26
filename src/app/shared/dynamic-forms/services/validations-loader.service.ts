import { FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationsLoader {
  constructor(private translate: TranslateService, private formlyConfig: FormlyConfig) {}

  init(): void {
    // message without params
    this.formlyConfig.addValidatorMessage('required', (err, field) => this.translate.instant('VALIDATIONS.REQUIRED'));
    this.formlyConfig.addValidatorMessage('email', (err, field) => this.translate.instant('VALIDATIONS.EMAIL'));
    this.formlyConfig.addValidatorMessage('pattern', (err, field) => this.translate.instant('VALIDATIONS.PATTERN'));

    // message with params
    this.formlyConfig.addValidatorMessage('minlength', (err, field) => this.minlengthValidationMessage(err, field));
    this.formlyConfig.addValidatorMessage('maxlength', (err, field) => this.maxlengthValidationMessage(err, field));
    this.formlyConfig.addValidatorMessage('min', (err, field) => this.minValidationMessage(err, field));
    this.formlyConfig.addValidatorMessage('max', (err, field) => this.maxValidationMessage(err, field));
  }

  private minlengthValidationMessage(err, field: FormlyFieldConfig): string {
    return this.translate.instant('VALIDATIONS.MIN_LENGTH', { number: field.templateOptions.minLength });
  }

  private maxlengthValidationMessage(err, field: FormlyFieldConfig): string {
    return this.translate.instant('VALIDATIONS.MAX_LENGTH', { number: field.templateOptions.maxLength });
  }

  private minValidationMessage(err, field: FormlyFieldConfig): string {
    return this.translate.instant('VALIDATIONS.MIN', { number: field.templateOptions.min });
  }

  private maxValidationMessage(err, field: FormlyFieldConfig): string {
    return this.translate.instant('VALIDATIONS.MAX', { number: field.templateOptions.max });
  }
}
