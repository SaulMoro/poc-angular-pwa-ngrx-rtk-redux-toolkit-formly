import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { FormConfig, generateFilterForm } from '@app/shared/dynamic-forms';
import { FormIds } from '@app/shared/models';

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
    fields: [],
  });

  constructor(private translate: TranslocoService) {}

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
                'templateOptions.label': this.translate.selectTranslate('EPISODES.FIELDS.NAME'),
              },
            },
            {
              key: 'episode',
              type: 'input',
              className: 'flex-25',
              templateOptions: {
                floatLabel: 'always',
              },
              expressionProperties: {
                'templateOptions.label': this.translate.selectTranslate('EPISODES.FIELDS.EPISODE'),
              },
            },
          ],
        },
      ],
    };
  }
}
