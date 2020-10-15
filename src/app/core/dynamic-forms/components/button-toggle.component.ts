import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-button-toogle-dynamic-form',
  template: `
    <h3 class="title">{{ to.label }}</h3>
    <mat-button-toggle-group
      [disabled]="to.disabled"
      [formControl]="formControl"
      name="fontStyle"
      aria-label="Font Style"
    >
      <mat-button-toggle
        *ngFor="let buttons of to.buttons"
        [formlyAttributes]="field"
        [style.background-color]="color"
        [value]="buttons.value"
      >
        {{ buttons.text }}
      </mat-button-toggle>
    </mat-button-toggle-group>
  `,
  styles: [
    `
      .title {
        font-size: 20px;
        color: #4a4a4a;
      }
    `,
  ],
})
export class ButtonToggleComponent extends FieldType implements OnInit {
  text: string;
  type: string;
  color: string;
  onClick?: () => {};

  ngOnInit(): void {
    this.onClick = !!this.to.onClick ? this.to.onClick : () => {};
    this.color = this.to.color;
  }
}
