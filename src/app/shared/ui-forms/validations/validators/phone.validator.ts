import { AbstractControl, ValidationErrors } from '@angular/forms';

const PHONE = /^[0-9]{9}$/;
const PHONE_WITH_PREFIX = /^(\+[0-9]{1,4}\s){0,1}[0-9]{9}$/;

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  return PHONE.test(control?.value) ? null : { phone: true };
}

export function phoneWithPrefixValidator(control: AbstractControl): ValidationErrors | null {
  return PHONE_WITH_PREFIX.test(control?.value) ? null : { phoneWithPrefix: true };
}
