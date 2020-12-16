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
export const fixDataUTCDates = (model: any): any => {
  // fix for utc dates
  const newModel = { ...model };
  Object.keys(newModel).forEach((key) => {
    newModel[key] =
      newModel[key] instanceof Date
        ? new Date(Date.UTC(newModel[key].getFullYear(), newModel[key].getMonth(), newModel[key].getDate()))
        : newModel[key];
  });

  return newModel;
};

export const fixDataFromQueryParams = (model: any): any => {
  const { page, ...newModel } = model;

  // Fix data
  Object.keys(newModel).forEach((key) => {
    newModel[key] =
      typeof newModel[key] === 'string'
        ? newModel[key].match(DATE_FORMAT_REGEXP)
          ? convertYYYYMMDDToDate(newModel[key])
          : newModel[key].replace(/%20/g, ' ')
        : newModel[key];
  });

  return newModel;
};

export const fixDataForQueryParams = (model: any): any => {
  const newModel = { ...model };

  // Fix data
  Object.keys(newModel).forEach((key) => {
    newModel[key] =
      newModel[key] instanceof Date
        ? formatDateToYYYYMMDD(newModel[key])
        : newModel[key] === false
        ? ''
        : Array.isArray(newModel[key]) && !newModel[key].length
        ? null
        : newModel[key];
  });

  return newModel;
};
