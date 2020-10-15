import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-input-default-dynamic-form',
  template: `
    <input
      *ngIf="!showDisabled; else show_disabled"
      matInput
      [id]="id"
      [type]="to.type || 'text'"
      [readonly]="to.readonly"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [tabindex]="to.tabindex || 0"
      [placeholder]="to.placeholder"
    />
    <ng-template #show_disabled>
      <span>{{ disabledValue }}</span>
    </ng-template>
  `,
})
export class InputDefaultComponent extends FieldType implements OnInit {
  @ViewChild(MatInput, { static: true }) formFieldControl: MatInput;

  disabledValue;
  showDisabled: boolean;

  ngOnInit(): void {
    this.disabledValue = !!this.to.disabledValue ? this.to.disabledValue : '-';
    this.showDisabled = this.to.disabled && !this.formControl.value;
    if (this.showDisabled) {
      this.to.floatLabel = 'always';
    }
  }
}
