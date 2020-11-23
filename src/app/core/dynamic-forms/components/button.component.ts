import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-button-dynamic-form',
  template: `
    <button
      [ngClass]="buttonType"
      [disabled]="to.disabled"
      [attr.type]="type"
      [formlyAttributes]="field"
      [style.background-color]="color"
      (click)="onClick()"
    >
      {{ text }}
      <mat-icon *ngIf="icon">
        {{ icon }}
      </mat-icon>
    </button>
  `,
})
export class ButtonComponent extends FieldType implements OnInit {
  text: string;
  type: string;
  color: string;
  buttonType: string;
  icon?: string;
  onClick?: () => {};

  ngOnInit(): void {
    this.buttonType = `${this.to.buttonType} ${this.to.matColor ? this.to.matColor : ''}`;
    this.text = this.to.text;
    this.onClick = !!this.to.onClick ? this.to.onClick : () => {};
    this.type = this.to.btnType;
    this.color = this.to.color;
    this.icon = this.to.icon;
  }
}
