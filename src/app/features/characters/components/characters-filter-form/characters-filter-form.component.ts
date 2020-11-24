import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { FormConfig, generateFilterForm } from '@app/core/dynamic-forms';
import { CharacterGender, CharacterSpecies, CharacterStatus, FormIds, Option } from '@app/shared/models';

@Component({
  selector: 'app-characters-filter-form',
  templateUrl: './characters-filter-form.component.html',
  styleUrls: ['./characters-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersFilterFormComponent implements OnInit {
  form = new FormGroup({});
  formConfig: FormConfig = generateFilterForm({
    formId: FormIds.FORM_CHARACTERS_FILTER_ID,
    fields: [],
  });
  status: Option[];
  genders: Option[];
  species: Option[];

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this._initOptions();
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
                'templateOptions.label': this.translocoService.selectTranslate('CHARACTERS.FIELDS.NAME'),
              },
            },
            {
              key: 'status',
              type: 'select-autocomplete',
              className: 'flex-25',
              templateOptions: {
                floatLabel: 'always',
                placeholder: 'CHARACTERS.PLACEHOLDERS.STATUS',
                autocomplete: true,
                showIcon: false,
                searchOptions: this.status,
              },
              expressionProperties: {
                'templateOptions.label': this.translocoService.selectTranslate('CHARACTERS.FIELDS.STATUS'),
              },
            },
            {
              key: 'gender',
              type: 'select-autocomplete',
              className: 'flex-25',
              templateOptions: {
                floatLabel: 'always',
                placeholder: 'CHARACTERS.PLACEHOLDERS.GENDER',
                autocomplete: true,
                showIcon: false,
                searchOptions: this.genders,
              },
              expressionProperties: {
                'templateOptions.label': this.translocoService.selectTranslate('CHARACTERS.FIELDS.GENDER'),
              },
            },
            {
              key: 'species',
              type: 'select-autocomplete',
              className: 'flex-25',
              templateOptions: {
                floatLabel: 'always',
                placeholder: 'CHARACTERS.PLACEHOLDERS.SPECIES',
                autocomplete: true,
                showIcon: false,
                searchOptions: this.species,
              },
              expressionProperties: {
                'templateOptions.label': this.translocoService.selectTranslate('CHARACTERS.FIELDS.SPECIES'),
              },
            },
          ],
        },
      ],
    };
  }

  private _initOptions(): void {
    this.status = [
      {
        id: CharacterStatus.alive,
        label: 'CHARACTERS.STATUS.' + CharacterStatus.alive.toUpperCase(),
      },
      {
        id: CharacterStatus.dead,
        label: 'CHARACTERS.STATUS.' + CharacterStatus.dead.toUpperCase(),
      },
      {
        id: CharacterStatus.unknown,
        label: 'CHARACTERS.STATUS.' + CharacterStatus.unknown.toUpperCase(),
      },
    ];

    this.genders = [
      {
        id: CharacterGender.male,
        label: 'CHARACTERS.GENDER.' + CharacterGender.male.toUpperCase(),
      },
      {
        id: CharacterGender.female,
        label: 'CHARACTERS.GENDER.' + CharacterGender.female.toUpperCase(),
      },
      {
        id: CharacterGender.genderless,
        label: 'CHARACTERS.GENDER.' + CharacterGender.genderless.toUpperCase(),
      },
      {
        id: CharacterGender.unknown,
        label: 'CHARACTERS.GENDER.' + CharacterGender.unknown.toUpperCase(),
      },
    ];

    this.species = [
      {
        id: CharacterSpecies.alien,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.alien.toUpperCase(),
      },
      {
        id: CharacterSpecies.animal,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.animal.toUpperCase(),
      },
      {
        id: CharacterSpecies.human,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.human.toUpperCase(),
      },
      {
        id: CharacterSpecies.humanoid,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.humanoid.toUpperCase(),
      },
      {
        id: CharacterSpecies.mytholog,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.mytholog.toUpperCase(),
      },
      {
        id: CharacterSpecies.poopybutthole,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.poopybutthole.toUpperCase(),
      },
      {
        id: CharacterSpecies.robot,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.robot.toUpperCase(),
      },
      {
        id: CharacterSpecies.vampire,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.vampire.toUpperCase(),
      },
      {
        id: CharacterSpecies.cronenberg,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.cronenberg.toUpperCase(),
      },
      {
        id: CharacterSpecies.disease,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.disease.toUpperCase(),
      },
      {
        id: CharacterSpecies.unknown,
        label: 'CHARACTERS.SPECIES.' + CharacterSpecies.unknown.toUpperCase(),
      },
    ];
  }
}
