import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-label-from-options-dynamic-form',
  template: `
    {{ valueToShow }}
    <input
      matInput
      [id]="id"
      [hidden]="true"
      [type]="'text'"
      [value]="value"
      [readonly]="to.readonly"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [errorStateMatcher]="errorStateMatcher"
      [tabindex]="to.tabindex || 0"
      [placeholder]="to.placeholder"
    />
  `,
})
export class LabelFromOptionsComponent extends FieldType implements OnInit {
  @ViewChild(MatInput, { static: true }) formFieldControl: MatInput;
  valueToShow: string;

  ngOnInit(): void {
    const findValue =
      this.to.optionsMap &&
      this.to.optionsMap.find((element) => element[this.to.optionsKey] === this.formControl.value);
    this.valueToShow = !!findValue ? findValue[this.to.optionsValue] : '';
  }
}
