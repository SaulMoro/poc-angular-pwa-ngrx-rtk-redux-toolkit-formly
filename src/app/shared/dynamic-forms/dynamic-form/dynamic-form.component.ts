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
import { FormConfig } from '../models/form-config.model';

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
  @Input() config: FormConfig;
  // tslint:disable-next-line: no-output-native
  @Output() submit = new EventEmitter<any>();
  @Output() modelChanges = new EventEmitter<any>();

  form$: Observable<FormsEntity>;

  constructor(private formsFacade: FormsFacade) {}

  ngOnInit(): void {
    this.formGroup.statusChanges
      .pipe(
        untilDestroyed(this),
        map((status) => status === FORM_VALID),
        skipWhile((valid) => !valid),
        distinctUntilChanged()
      )
      .subscribe((valid) => this.formsFacade.updateFormValid(this.config.formId, valid));
  }

  ngOnChanges(): void {
    this.form$ = this.formsFacade.formById$(this.config.formId);

    this.form$.pipe(take(1)).subscribe((form) => {
      if (!form || this.config.reset) {
        this.formsFacade.initForm(
          this.config.formId,
          this.config.initialModel,
          this.config.filter || this.config.filterOnSubmit
        );
      } else {
        this.formsFacade.reuseForm(this.config.formId, form.model, this.config.filter);
      }
    });

    this.config.disable ? this.formGroup.disable() : this.formGroup.enable();
  }

  ngOnDestroy(): void {
    // Necessary for untilDestroyed pipe
  }

  onModelChange(newModel: any, currModel: any): void {
    if (JSON.stringify(newModel) !== JSON.stringify(currModel)) {
      this.formsFacade.updateFormModel(this.config.formId, newModel, this.config.filter);
      this.modelChanges.emit(newModel);
    }
  }

  onSubmitForm(model: any): void {
    this.formsFacade.submitForm(this.config.formId, model, this.config.initialModel, this.config.filterOnSubmit);
    this.submit.emit(model);
  }
}
