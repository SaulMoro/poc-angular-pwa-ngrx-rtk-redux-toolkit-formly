import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { DataAccessFormsModule } from './data-access-forms';
import { ValidationsLoader } from './services/validations-loader.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { applyDefaultOptions } from './config';
import { addonsExtension } from './extensions/addons.extension';
import { WrapperAddonsComponent } from './wrappers/addons.wrappper';
import { LabeledFormPanelComponent } from './wrappers/labeled-form-panel.wrapper';

import { ButtonComponent } from './components/button.component';
import { ButtonToggleComponent } from './components/button-toggle.component';
import { DatepickerDefaultComponent } from './components/datepicker-default.component';
import { InputDefaultComponent } from './components/input-default.component';
import { InputUploadComponent } from './components/input-upload.component';
import { LabelFromOptionsComponent } from './components/label-from-options.component';
import { SelectAutocompleteComponent } from './components/select-autocomplete.component';
import { SelectDefaultComponent } from './components/select-default.component';
import { SpacerComponent } from './components/spacer.component';

const MATERIAL_MODULES = [
  MatInputModule,
  MatIconModule,
  MatDatepickerModule,
  MatSelectModule,
  MatPseudoCheckboxModule,
  MatButtonToggleModule,
];

const EXPORTED_IMPORTS = [ReactiveFormsModule];
const EXPORTED_DECLARATIONS = [
  DynamicFormComponent,
  SpacerComponent,
  SelectAutocompleteComponent,
  ButtonComponent,
  ButtonToggleComponent,
  InputUploadComponent,
  InputDefaultComponent,
  WrapperAddonsComponent,
  LabeledFormPanelComponent,
  LabelFromOptionsComponent,
  DatepickerDefaultComponent,
  SelectDefaultComponent,
];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    ...EXPORTED_IMPORTS,
    ...MATERIAL_MODULES,
    CommonModule,
    DataAccessFormsModule,
    FormlyMaterialModule,
    FormlySelectModule,
    FormlyMatDatepickerModule,
    FormlyMatFormFieldModule,
    TranslocoModule,
    FlexLayoutModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,

    FormlyModule.forRoot({
      types: [
        { name: 'spacer', component: SpacerComponent },
        { name: 'select-autocomplete', component: SelectAutocompleteComponent, wrappers: ['form-field'] },
        { name: 'file', component: InputUploadComponent },
        { name: 'input-default', component: InputDefaultComponent, wrappers: ['form-field'] },
        { name: 'datepicker-default', component: DatepickerDefaultComponent, wrappers: ['form-field'] },
        { name: 'select-default', component: SelectDefaultComponent, wrappers: ['form-field'] },
        {
          name: 'button',
          component: ButtonComponent,
          defaultOptions: {
            templateOptions: {
              buttonType: 'mat-raised-button',
              color: 'primary',
            },
          },
        },
        {
          name: 'button-toggle',
          component: ButtonToggleComponent,
          defaultOptions: {
            templateOptions: {
              color: 'primary',
            },
          },
        },
        { name: 'label-options', component: LabelFromOptionsComponent, wrappers: ['form-field'] },
      ],
      wrappers: [
        { name: 'addons', component: WrapperAddonsComponent },
        { name: 'labeled-form-panel', component: LabeledFormPanelComponent },
      ],
      extensions: [
        { name: 'defaultOptions', extension: { prePopulate: applyDefaultOptions } },
        { name: 'addons', extension: { onPopulate: addonsExtension } },
      ],
      extras: { checkExpressionOn: 'modelChange', immutable: true },
    }),
  ],
  exports: [...EXPORTED_IMPORTS, ...EXPORTED_DECLARATIONS],
})
export class DynamicFormsModule {
  constructor(private validationsLoader: ValidationsLoader) {
    this.validationsLoader.init();
  }
}
