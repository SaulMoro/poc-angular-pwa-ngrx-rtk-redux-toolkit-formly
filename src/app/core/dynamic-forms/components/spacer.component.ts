import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-spacer-dynamic-form',
  template: ` <ng-container></ng-container> `,
})
export class SpacerComponent extends FieldType {}
