import { FormField } from '@app/shared/ui-forms';

const row = (fieldGroup: FormField[]) => FormField.fieldRow(fieldGroup, 'grid grid-cols-4 mt-4 gap-6');
const fieldClass = 'col-span-2 sm:col-span-1';

export const episodesFilterForm = [
  row([
    FormField.input('name', { label: 'EPISODES.FIELDS.NAME' }, { className: fieldClass }),
    FormField.input('episode', { label: 'EPISODES.FIELDS.EPISODE' }, { className: fieldClass }),
  ]),
];
