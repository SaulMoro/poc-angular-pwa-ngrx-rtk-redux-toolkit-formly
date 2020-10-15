import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FieldConfig, FormOptions } from '@app/core/dynamic-forms';
import {
  CharacterGender,
  CharactersFilter,
  CharacterSpecies,
  CharacterStatus,
  FormIds,
  Option,
} from '@app/shared/models';

@Component({
  selector: 'app-characters-filter-form',
  templateUrl: './characters-filter-form.component.html',
  styleUrls: ['./characters-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersFilterFormComponent implements OnInit {
  FORM_GROUP_ID = FormIds.FORM_CHARACTERS_FILTER_ID;

  initialModel: CharactersFilter = {};
  form = new FormGroup({});
  fields: FieldConfig[] = [];
  options: FormOptions = {};

  status: Option[] = [
    {
      id: CharacterStatus.alive,
      label: this.translate.instant('CHARACTERS.STATUS.' + CharacterStatus.alive.toUpperCase()),
    },
    {
      id: CharacterStatus.dead,
      label: this.translate.instant('CHARACTERS.STATUS.' + CharacterStatus.dead.toUpperCase()),
    },
    {
      id: CharacterStatus.unknown,
      label: this.translate.instant('CHARACTERS.STATUS.' + CharacterStatus.unknown.toUpperCase()),
    },
  ];

  genders: Option[] = [
    {
      id: CharacterGender.male,
      label: this.translate.instant('CHARACTERS.GENDER.' + CharacterGender.male.toUpperCase()),
    },
    {
      id: CharacterGender.female,
      label: this.translate.instant('CHARACTERS.GENDER.' + CharacterGender.female.toUpperCase()),
    },
    {
      id: CharacterGender.genderless,
      label: this.translate.instant('CHARACTERS.GENDER.' + CharacterGender.genderless.toUpperCase()),
    },
    {
      id: CharacterGender.unknown,
      label: this.translate.instant('CHARACTERS.GENDER.' + CharacterGender.unknown.toUpperCase()),
    },
  ];

  species: Option[] = [
    {
      id: CharacterSpecies.alien,
      label: this.translate.instant('CHARACTERS.SPECIES.' + CharacterSpecies.alien.toUpperCase()),
    },
    {
      id: CharacterSpecies.animal,
      label: this.translate.instant('CHARACTERS.SPECIES.' + CharacterSpecies.animal.toUpperCase()),
    },
    {
      id: CharacterSpecies.human,
      label: this.translate.instant('CHARACTERS.SPECIES.' + CharacterSpecies.human.toUpperCase()),
    },
    {
      id: CharacterSpecies.humanoid,
      label: this.translate.instant('CHARACTERS.SPECIES.' + CharacterSpecies.humanoid.toUpperCase()),
    },
    {
      id: CharacterSpecies.mytholog,
      label: this.translate.instant('CHARACTERS.SPECIES.' + CharacterSpecies.mytholog.toUpperCase()),
    },
    {
      id: CharacterSpecies.poopybutthole,
      label: this.translate.instant('CHARACTERS.SPECIES.' + CharacterSpecies.poopybutthole.toUpperCase()),
    },
    {
      id: CharacterSpecies.robot,
      label: this.translate.instant('CHARACTERS.SPECIES.' + CharacterSpecies.robot.toUpperCase()),
    },
    {
      id: CharacterSpecies.vampire,
      label: this.translate.instant('CHARACTERS.SPECIES.' + CharacterSpecies.vampire.toUpperCase()),
    },
    {
      id: CharacterSpecies.unknown,
      label: this.translate.instant('CHARACTERS.SPECIES.' + CharacterSpecies.unknown.toUpperCase()),
    },
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.initForm();
  }

  resetFilter(): void {
    this.form.patchValue({
      name: undefined,
      status: undefined,
      species: undefined,
      type: undefined,
      gender: undefined,
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
              label: this.translate.instant('CHARACTERS.FIELDS.NAME'),
            },
          },
          {
            key: 'status',
            type: 'select-autocomplete',
            className: 'flex-25',
            templateOptions: {
              floatLabel: 'always',
              label: this.translate.instant('CHARACTERS.FIELDS.STATUS'),
              placeholder: this.translate.instant('CHARACTERS.PLACEHOLDERS.STATUS'),
              autocomplete: true,
              showIcon: false,
              searchOptions: this.status,
            },
          },
          {
            key: 'gender',
            type: 'select-autocomplete',
            className: 'flex-25',
            templateOptions: {
              floatLabel: 'always',
              label: this.translate.instant('CHARACTERS.FIELDS.GENDER'),
              placeholder: this.translate.instant('CHARACTERS.PLACEHOLDERS.GENDER'),
              autocomplete: true,
              showIcon: false,
              searchOptions: this.genders,
            },
          },
          {
            key: 'species',
            type: 'select-autocomplete',
            className: 'flex-25',
            templateOptions: {
              floatLabel: 'always',
              label: this.translate.instant('CHARACTERS.FIELDS.SPECIES'),
              placeholder: this.translate.instant('CHARACTERS.PLACEHOLDERS.SPECIES'),
              autocomplete: true,
              showIcon: false,
              searchOptions: this.species,
            },
          },
        ],
      },
    ];
  }
}
