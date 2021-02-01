import { FormField, SelectOptions } from '@app/shared/ui-forms';

const row = (fieldGroup: FormField[]) => FormField.fieldRow(fieldGroup, 'grid grid-cols-4 mt-4 gap-6');
const fieldClass = 'col-span-2 sm:col-span-1';

export const charactersFilterForm = (
  statusOptions: SelectOptions,
  gendersOptions: SelectOptions,
  speciesOptions: SelectOptions,
) => [
  row([
    FormField.input('name', { label: 'CHARACTERS.FIELDS.NAME' }, { className: fieldClass }),
    FormField.select(
      'status',
      { label: 'CHARACTERS.FIELDS.STATUS', placeholder: 'CHARACTERS.PLACEHOLDERS.STATUS' },
      statusOptions,
      { className: fieldClass },
    ),
    FormField.select(
      'gender',
      { label: 'CHARACTERS.FIELDS.GENDER', placeholder: 'CHARACTERS.PLACEHOLDERS.GENDER' },
      gendersOptions,
      { className: fieldClass },
    ),
    FormField.select(
      'species',
      { label: 'CHARACTERS.FIELDS.SPECIES', placeholder: 'CHARACTERS.PLACEHOLDERS.SPECIES' },
      speciesOptions,
      { className: fieldClass },
    ),
  ]),
];
