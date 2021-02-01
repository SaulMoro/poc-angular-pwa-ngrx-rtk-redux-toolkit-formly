import { FormField } from '@app/shared/ui-forms';

const row = (fieldGroup: FormField[]) => FormField.fieldRow(fieldGroup, 'grid grid-cols-4 mt-4 gap-6');
const fieldClass = 'col-span-2 sm:col-span-1';

export const locationsFilterForm = [
  row([
    FormField.input('name', { label: 'LOCATIONS.FIELDS.NAME' }, { className: fieldClass }),
    FormField.input('type', { label: 'LOCATIONS.FIELDS.TYPE' }, { className: fieldClass }),
    FormField.input('dimension', { label: 'LOCATIONS.FIELDS.DIMENSION' }, { className: fieldClass }),
  ]),
];
