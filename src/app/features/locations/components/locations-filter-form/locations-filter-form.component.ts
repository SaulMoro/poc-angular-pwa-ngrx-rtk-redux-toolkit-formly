import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { FormConfig, generateFilterForm } from '@app/core/dynamic-forms';
import { FormIds } from '@app/shared/models';

@Component({
  selector: 'app-locations-filter-form',
  templateUrl: './locations-filter-form.component.html',
  styleUrls: ['./locations-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsFilterFormComponent implements OnInit {
  form = new FormGroup({});
  formConfig: FormConfig = generateFilterForm({
    formId: FormIds.FORM_LOCATIONS_FILTER_ID,
    fields: [],
  });

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this._initForm();
  }

  resetFilter(): void {
    this.form.reset();
  }

  private _initForm(): void {
    this.formConfig = {
      ...this.formConfig,
      fields: [
        {
          fieldGroupClassName: 'flex-container no-margin no-padding',
          fieldGroup: [
            {
              key: 'name',
              type: 'input',
              className: 'flex-25',
              templateOptions: {
                floatLabel: 'always',
              },
              expressionProperties: {
                'templateOptions.label': this.translocoService.selectTranslate('LOCATIONS.FIELDS.NAME'),
              },
            },
            {
              key: 'type',
              type: 'input',
              className: 'flex-25',
              templateOptions: {
                floatLabel: 'always',
              },
              expressionProperties: {
                'templateOptions.label': this.translocoService.selectTranslate('LOCATIONS.FIELDS.TYPE'),
              },
            },
            {
              key: 'dimension',
              type: 'input',
              className: 'flex-25',
              templateOptions: {
                floatLabel: 'always',
              },
              expressionProperties: {
                'templateOptions.label': this.translocoService.selectTranslate('LOCATIONS.FIELDS.DIMENSION'),
              },
            },
          ],
        },
      ],
    };
  }
}
