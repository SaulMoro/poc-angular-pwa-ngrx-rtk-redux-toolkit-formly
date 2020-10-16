import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FieldConfig, FormOptions } from '@app/core/dynamic-forms';
import { EpisodesFilter, FormIds } from '@app/shared/models';

@Component({
  selector: 'app-episodes-filter-form',
  templateUrl: './episodes-filter-form.component.html',
  styleUrls: ['./episodes-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesFilterFormComponent implements OnInit {
  FORM_GROUP_ID = FormIds.FORM_EPISODES_FILTER_ID;

  initialModel: EpisodesFilter = {};
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
      episode: undefined,
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
              label: this.translate.instant('EPISODES.FIELDS.NAME'),
            },
          },
          {
            key: 'episode',
            type: 'input',
            className: 'flex-25',
            templateOptions: {
              floatLabel: 'always',
              label: this.translate.instant('EPISODES.FIELDS.EPISODE'),
            },
          },
        ],
      },
    ];
  }
}
