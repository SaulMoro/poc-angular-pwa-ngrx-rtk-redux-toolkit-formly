import { TranslocoService } from '@ngneat/transloco';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class TranslateExtension {
  constructor(private translocoService: TranslocoService) {}

  prePopulate(field: FormlyFieldConfig): void {
    const to = field.templateOptions || {};
    if (!to.translate || to._translated) {
      return;
    }

    to._translated = true;
    field.expressionProperties = {
      ...(field.expressionProperties || {}),
      'templateOptions.label': to.label ? this.translocoService.selectTranslate(to.label) : '',
      'templateOptions.placeholder': to.placeholder ? this.translocoService.selectTranslate(to.placeholder) : '',
    };
  }
}

export function registerTranslateExtension(translocoService: TranslocoService): any {
  return {
    validationMessages: [
      {
        name: 'required',
        message: () => translocoService.selectTranslate('VALIDATIONS.REQUIRED'),
      },
      {
        name: 'pattern',
        message: () => translocoService.selectTranslate('VALIDATIONS.PATTERN'),
      },
      {
        name: 'minlength',
        message: (error: any, field: FormlyFieldConfig) =>
          translocoService.selectTranslate('VALIDATIONS.MIN_LENGTH', { number: field.templateOptions?.minLength }),
      },
      {
        name: 'maxlength',
        message: (error: any, field: FormlyFieldConfig) =>
          translocoService.selectTranslate('VALIDATIONS.MAX_LENGTH', { number: field.templateOptions?.maxLength }),
      },
      {
        name: 'min',
        message: (error: any, field: FormlyFieldConfig) =>
          translocoService.selectTranslate('VALIDATIONS.MIN', { number: field.templateOptions?.min }),
      },
      {
        name: 'max',
        message: (error: any, field: FormlyFieldConfig) =>
          translocoService.selectTranslate('VALIDATIONS.MAX', { number: field.templateOptions?.max }),
      },

      // Custom
      {
        name: 'email',
        message: () => translocoService.selectTranslate('VALIDATIONS.EMAIL'),
      },
      {
        name: 'phone',
        message: () => translocoService.selectTranslate('VALIDATIONS.PHONE'),
      },
      {
        name: 'dni',
        message: () => translocoService.selectTranslate('VALIDATIONS.DNI'),
      },
      {
        name: 'spanishId',
        message: () => translocoService.selectTranslate('VALIDATIONS.SPANISH_ID'),
      },
    ],
    extensions: [
      {
        name: 'translate',
        extension: new TranslateExtension(translocoService),
      },
    ],
  };
}
