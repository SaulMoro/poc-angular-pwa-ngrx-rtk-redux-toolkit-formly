import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, map, skipWhile, distinctUntilChanged } from 'rxjs/operators';

import { untilDestroyed } from '@app/shared/pipes';
import { FormsEntity, FormsFacade } from '../data-access-forms';
import { FieldConfig } from '../models/field-config.model';
import { FormOptions } from '../models/form-options.model';

const FORM_VALID = 'VALID';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit, OnDestroy, OnChanges {
  // tslint:disable-next-line: no-input-rename
  @Input('form') formGroup = new FormGroup({});

  @Input() formId: string;
  @Input() initialModel: any = {};
  @Input() fields: FieldConfig[];
  @Input() options: FormOptions = {};
  @Input() filter = false;
  @Input() filterOnSubmit = false;
  @Input() reset = false;
  @Input() disable = false;
  @Input() disableInitialization = false;

  // tslint:disable-next-line: no-output-native
  @Output() submit = new EventEmitter<any>();
  @Output() modelChanges = new EventEmitter<any>();

  form$: Observable<FormsEntity>;
  previousModel: any;
  model: any;

  constructor(private formsFacade: FormsFacade) {}

  ngOnInit(): void {
    this.formGroup.statusChanges
      .pipe(
        untilDestroyed(this),
        map((status) => status === FORM_VALID),
        skipWhile((valid) => !valid),
        distinctUntilChanged()
      )
      .subscribe((valid) => this.formsFacade.updateFormValid(this.formId, valid));

    this.previousModel = { ...this.initialModel };
  }

  ngOnChanges(): void {
    this.form$ = this.formsFacade.formById$(this.formId);

    if (!this.disableInitialization) {
      this.form$.pipe(take(1)).subscribe((form) => {
        if (!form || this.reset) {
          this.formsFacade.initForm(this.formId, this.initialModel, this.filter || this.filterOnSubmit);
          this.previousModel = { ...this.initialModel };
        } else {
          this.formsFacade.reuseForm(this.formId, form.model, this.filter);
        }
      });
    } else {
      this.previousModel = { ...this.initialModel };
    }

    this.disable ? this.formGroup.disable() : this.formGroup.enable();
  }

  ngOnDestroy(): void {
    // Necessary for untilDestroyed pipe
  }

  onModelChange(newModel: any): void {
    if (this.disableInitialization) {
      if (JSON.stringify(newModel) !== JSON.stringify(this.previousModel)) {
        this.previousModel = { ...newModel };
        this.modelChanges.emit(newModel);
      }
    } else {
      this.form$.pipe(take(1)).subscribe(({ model }) => {
        if (JSON.stringify(newModel) !== JSON.stringify(model)) {
          this.formsFacade.updateFormModel(this.formId, newModel, this.filter);
          this.modelChanges.emit(newModel);
        }
      });
    }
  }

  onSubmitForm(model: any): void {
    this.formsFacade.submitForm(this.formId, model, this.initialModel, this.filterOnSubmit);
    this.submit.emit(model);
  }

  onSubmitFormObs(): void {
    this.form$.pipe(take(1)).subscribe((form) => {
      this.formsFacade.submitForm(this.formId, form.model, this.initialModel, this.filterOnSubmit);
      this.submit.emit(form.model);
    });
  }
}
