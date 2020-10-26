// panel-wrapper.component.ts
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-labeled-wrapper-panel',
  template: `
    <div class="{{ to.labelTextClass }}">{{ to.labelText }}</div>
    <ng-container #fieldComponent></ng-container>
  `,
})
export class LabeledFormPanelComponent extends FieldWrapper {}
