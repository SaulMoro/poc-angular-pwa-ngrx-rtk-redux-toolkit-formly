import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField, FormConfig, generateFilterForm } from '@app/core/ngrx-form';
import { FORM_LOCATIONS_FILTER_ID } from '@app/shared/models';

const row = (fieldGroup: FormField[]) => FormField.fieldRow(fieldGroup, 'grid grid-cols-4 mt-4 gap-6');
const fieldClass = 'col-span-2 sm:col-span-1';

@Component({
  selector: 'app-locations-filter-form',
  templateUrl: './locations-filter-form.component.html',
  styleUrls: ['./locations-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsFilterFormComponent implements OnInit {
  form = new FormGroup({});
  formConfig: FormConfig = generateFilterForm({
    formId: FORM_LOCATIONS_FILTER_ID,
    fields: [
      row([
        FormField.input('name', { translate: true, label: 'LOCATIONS.FIELDS.NAME' }, { className: fieldClass }),
        FormField.input('type', { translate: true, label: 'LOCATIONS.FIELDS.TYPE' }, { className: fieldClass }),
        FormField.input(
          'dimension',
          { translate: true, label: 'LOCATIONS.FIELDS.DIMENSION' },
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
