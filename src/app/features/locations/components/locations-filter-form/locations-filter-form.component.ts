import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FieldConfig, FormOptions } from '@app/core/dynamic-forms';
import { LocationsFilter, FormIds } from '@app/shared/models';

@Component({
  selector: 'app-locations-filter-form',
  templateUrl: './locations-filter-form.component.html',
  styleUrls: ['./locations-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsFilterFormComponent implements OnInit {
  FORM_GROUP_ID = FormIds.FORM_LOCATIONS_FILTER_ID;

  initialModel: LocationsFilter = {};
  form = new FormGroup({});
  fields: FieldConfig[] = [];
  options: FormOptions = {};

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.initForm();
  }

  resetFilter(): void {
    this.form.patchValue({
      name: undefined,
      type: undefined,
      dimension: undefined,
    });
  }

  private initForm(): void {
    this.fields = [
      {
        fieldGroupClassName: 'flex-container no-margin no-padding',
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            className: 'flex-25',
            templateOptions: {
              floatLabel: 'always',
              label: this.translate.instant('LOCATIONS.FIELDS.NAME'),
            },
          },
          {
            key: 'type',
            type: 'input',
            className: 'flex-25',
            templateOptions: {
              floatLabel: 'always',
              label: this.translate.instant('LOCATIONS.FIELDS.TYPE'),
            },
          },
          {
            key: 'dimension',
            type: 'input',
            className: 'flex-25',
            templateOptions: {
              floatLabel: 'always',
              label: this.translate.instant('LOCATIONS.FIELDS.DIMENSION'),
            },
          },
        ],
      },
    ];
  }
}
