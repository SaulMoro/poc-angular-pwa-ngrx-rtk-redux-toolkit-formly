import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { ɵdefineHiddenProp as defineHiddenProp } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-datepicker-default-dynamic-form',
  template: `
    <ng-template [ngIf]="!showDisabled">
      <input
        matInput
        [id]="id"
        [errorStateMatcher]="errorStateMatcher"
        [formControl]="formControl"
        [matDatepicker]="picker"
        [matDatepickerFilter]="to.datepickerOptions.filter"
        [max]="to.datepickerOptions.max"
        [min]="to.datepickerOptions.min"
        [formlyAttributes]="field"
        [placeholder]="to.placeholder"
        [tabindex]="to.tabindex || 0"
        [readonly]="to.readonly"
      />
      <ng-template #datepickerToggle>
        <mat-datepicker-toggle [for]="picker"></mat-datepicker-toggle>
      </ng-template>
      <mat-datepicker
        #picker
        [color]="to.color"
        [touchUi]="to.datepickerOptions.touchUi"
        [startView]="to.datepickerOptions.startView"
        [startAt]="to.datepickerOptions.startAt"
      >
      </mat-datepicker>
    </ng-template>

    <ng-template [ngIf]="showDisabled">
      <span>{{ disabledValue }}</span>
    </ng-template>
  `,
})
export class DatepickerDefaultComponent extends FieldType implements OnInit, AfterViewInit {
  @ViewChild(MatInput, { static: true }) formFieldControl!: MatInput;
  @ViewChild(MatDatepickerInput) datepickerInput!: MatDatepickerInput<any>;
  @ViewChild('datepickerToggle') datepickerToggle!: TemplateRef<any>;

  defaultOptions = {
    templateOptions: {
      datepickerOptions: {
        startView: 'month',
        datepickerTogglePosition: 'suffix',
      },
    },
  };
  disabledValue;
  showDisabled: boolean;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    if (!this.showDisabled) {
      // temporary fix for https://github.com/angular/material2/issues/6728
      (this.datepickerInput as any)._formField = this.formField;

      setTimeout(() => {
        defineHiddenProp(
          this.field,
          '_mat' + this.to.datepickerOptions.datepickerTogglePosition,
          this.datepickerToggle
        );
        (this.options as any)._markForCheck(this.field);
      });
    }
  }

  ngOnInit(): void {
    this.checkInputs();
    this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.checkInputs();
    });
  }

  private checkInputs(): void {
    this.disabledValue = !!this.to.disabledValue ? this.to.disabledValue : '-';
    this.showDisabled = this.to.disabled && !this.formControl.value;

    if (this.showDisabled) {
      this.to.floatLabel = 'always';
    }
  }
}
