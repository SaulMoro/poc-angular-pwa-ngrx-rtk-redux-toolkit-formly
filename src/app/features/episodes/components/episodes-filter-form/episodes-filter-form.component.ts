import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormField, FormConfig, generateFilterForm } from '@app/core/dynamic-form';
import { FormIds } from '@app/shared/models';

const row = (fieldGroup: DynamicFormField[]) => DynamicFormField.fieldRow(fieldGroup, 'grid grid-cols-4 mt-4 gap-6');
const fieldClass = 'col-span-2 sm:col-span-1';

@Component({
  selector: 'app-episodes-filter-form',
  templateUrl: './episodes-filter-form.component.html',
  styleUrls: ['./episodes-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesFilterFormComponent implements OnInit {
  form = new FormGroup({});
  formConfig: FormConfig = generateFilterForm({
    formId: FormIds.FORM_EPISODES_FILTER_ID,
    fields: [
      row([
        DynamicFormField.input('name', { translate: true, label: 'EPISODES.FIELDS.NAME' }, { className: fieldClass }),
        DynamicFormField.input(
          'episode',
          { translate: true, label: 'EPISODES.FIELDS.EPISODE' },
          { className: fieldClass }
        ),
      ]),
    ],
  });

  constructor() {}

  ngOnInit(): void {}

  resetFilter(): void {
    this.form.reset();
  }
}
