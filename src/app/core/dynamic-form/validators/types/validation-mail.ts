import { AbstractControl, ValidationErrors } from '@angular/forms';

// tslint:disable-next-line: max-line-length
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function emailValidator(control: AbstractControl): ValidationErrors {
  return emailRegex.test(control?.value) ? null : { email: true };
}
