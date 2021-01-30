import { AbstractControl, ValidationErrors } from '@angular/forms';

const DNI_REGEX = /^(\d{8})([A-Z])$/;
const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
const NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;

export const spainIdType = (str: string) => {
  if (DNI_REGEX.exec(str)) {
    return 'dni';
  }
  if (CIF_REGEX.exec(str)) {
    return 'cif';
  }
  if (NIE_REGEX.exec(str)) {
    return 'nie';
  }
  return null;
};

export const validDNI = (str: string) => {
  const dni_letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const letter = dni_letters.charAt(parseInt(str, 10) % 23);

  return letter === str.charAt(8);
};

export const validNIE = (str: string) => {
  // Change the initial letter for the corresponding number and validate as DNI
  let nie_prefix: string | number = str.charAt(0);

  switch (nie_prefix) {
    case 'X':
      nie_prefix = 0;
      break;
    case 'Y':
      nie_prefix = 1;
      break;
    case 'Z':
      nie_prefix = 2;
      break;
  }

  return validDNI(`${nie_prefix}${str.substr(1)}`);
};

export const validCIF = (str: string) => {
  if (!str || str.length !== 9) {
    return false;
  }

  const letters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const digits = str.substr(1, str.length - 2);
  const letter = str.substr(0, 1);
  const control = str.substr(str.length - 1);
  let sum = 0;
  let i;
  let digit: number;

  if (!/[A-Z]/.exec(letter)) {
    return false;
  }

  for (i = 0; i < digits.length; ++i) {
    digit = parseInt(digits[i], 10);

    if (isNaN(digit)) {
      return false;
    }

    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit = parseInt(String(digit / 10), 10) + (digit % 10);
      }

      sum += digit;
    } else {
      sum += digit;
    }
  }

  sum %= 10;
  if (sum !== 0) {
    digit = 10 - sum;
  } else {
    digit = sum;
  }

  if (/[ABEH]/.exec(letter)) {
    return String(digit) === control;
  }
  if (/[NPQRSW]/.exec(letter)) {
    return letters[digit] === control;
  }

  return String(digit) === control || letters[digit] === control;
};

export const validateSpanishId = (str: string) => {
  // Ensure upcase and remove whitespace ang hyphens
  str = str.toUpperCase().replace(/\s/, '').replace('-', '');

  let valid = false;
  const type = spainIdType(str);

  switch (type) {
    case 'dni':
      valid = validDNI(str);
      break;
    case 'nie':
      valid = validNIE(str);
      break;
    case 'cif':
      valid = validCIF(str);
      break;
  }

  return valid;
};

export function dniValidator(control: AbstractControl): ValidationErrors | null {
  return validDNI(control?.value) ? null : { dni: true };
}

export function spanishIdValidator(control: AbstractControl): ValidationErrors | null {
  return validateSpanishId(control?.value) ? null : { spanishId: true };
}
