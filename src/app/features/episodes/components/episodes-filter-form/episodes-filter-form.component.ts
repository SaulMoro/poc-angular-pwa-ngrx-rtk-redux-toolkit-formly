import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField, FormConfig, generateFilterForm } from '@app/core/ngrx-form';

const FORM_EPISODES_FILTER_ID = 'FORM_EPISODES_FILTER';

const row = (fieldGroup: FormField[]) => FormField.fieldRow(fieldGroup, 'grid grid-cols-4 mt-4 gap-6');
const fieldClass = 'col-span-2 sm:col-span-1';

@Component({
  selector: 'app-episodes-filter-form',
  templateUrl: './episodes-filter-form.component.html',
  styleUrls: ['./episodes-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesFilterFormComponent {
  form = new FormGroup({});
  formConfig: FormConfig = generateFilterForm({
    formId: FORM_EPISODES_FILTER_ID,
    fields: [
      row([
        FormField.input('name', { translate: true, label: 'EPISODES.FIELDS.NAME' }, { className: fieldClass }),
        FormField.input('episode', { translate: true, label: 'EPISODES.FIELDS.EPISODE' }, { className: fieldClass }),
      ]),
    ],
  });

  resetFilter(): void {
    this.form.reset();
  }
}
