import { formatDate } from '@angular/common';

export const DATE_FORMAT_REGEXP = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const DATE_FORMAT = 'yyyy-MM-dd';
const DATE_LOCALE = 'en-US';

const DATE_FORMAT_WITH_SLASH = 'dd/MM/yyyy';
const YEAR = 2;
const MONTH = 1;
const DAY = 0;

export const formatDateToYYYYMMDD = (date: Date) => date && formatDate(date, DATE_FORMAT, DATE_LOCALE);
export const convertYYYYMMDDToDate = (dateString: string) => dateString && new Date(dateString);
export const formatDateWithSlashes = (date: Date) => date && formatDate(date, DATE_FORMAT_WITH_SLASH, DATE_LOCALE);
export const convertStringWithSlashesToDate = (dateString: string) => {
  if (dateString) {
    const dateFields = dateString.split('/');
    return new Date(`${dateFields[YEAR]}-${dateFields[MONTH]}-${dateFields[DAY]}`);
  } else {
    return null;
  }
};
