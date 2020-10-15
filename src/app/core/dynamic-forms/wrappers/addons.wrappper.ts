import { Component, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-wrapper-addons',
  template: `
    <span
      *ngIf="to.addonTop"
      [ngStyle]="{ cursor: to.addonTop.onClick ? 'pointer' : 'inherit' }"
      (click)="addonTopClick($event)"
    >
      <i *ngIf="to.addonTop.class" [ngClass]="to.addonTop.class"></i>&nbsp;
      <span [ngClass]="to.addonTop.textClass" *ngIf="to.addonTop.text">{{ to.addonTop.text }}</span>
    </span>

    <ng-template #matPrefix>
      <span
        *ngIf="to.addonLeft"
        [ngStyle]="{ cursor: to.addonLeft.onClick ? 'pointer' : 'inherit' }"
        (click)="addonLeftClick($event)"
      >
        <i *ngIf="to.addonLeft.class" [ngClass]="to.addonLeft.class"></i>&nbsp;
        <span *ngIf="to.addonLeft.text">{{ to.addonLeft.text }}</span
        >&nbsp;
      </span>
    </ng-template>

    <ng-container #fieldComponent></ng-container>

    <ng-template #matSuffix>
      <span
        *ngIf="to.addonRight"
        [ngStyle]="{ cursor: to.addonRight.onClick ? 'pointer' : 'inherit' }"
        (click)="addonRightClick($event)"
      >
        <ng-container *ngIf="to.addonRight.class && to.addonRight.class !== 'material-icons'; else icon">
          &nbsp;<i *ngIf="to.addonRight.class" [ngClass]="to.addonRight.class"></i> &nbsp;<span
            *ngIf="to.addonRight.text"
            >{{ to.addonRight.text }}</span
          >
        </ng-container>
        <ng-template #icon>
          <i class="material-icons" style="margin-right: 8px;">{{
            to.addonRight.text ? to.addonRight.text : 'help'
          }}</i>
        </ng-template>
      </span>
    </ng-template>
  `,
})
export class WrapperAddonsComponent extends FieldWrapper implements AfterViewInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: true }) fieldComponent!: ViewContainerRef;
  @ViewChild('matPrefix', { static: true }) matPrefix: TemplateRef<any>;
  @ViewChild('matSuffix', { static: true }) matSuffix: TemplateRef<any>;

  ngAfterViewInit(): void {
    if (this.matPrefix) {
      Promise.resolve().then(() => (this.to.prefix = this.matPrefix));
    }

    if (this.matSuffix) {
      Promise.resolve().then(() => (this.to.suffix = this.matSuffix));
    }
  }

  addonRightClick($event: any): void {
    if (this.to.addonRight.onClick) {
      this.to.addonRight.onClick(this.to, this, $event);
    }
  }

  addonLeftClick($event: any): void {
    if (this.to.addonLeft.onClick) {
      this.to.addonLeft.onClick(this.to, this, $event);
    }
  }

  addonTopClick($event: any): void {
    if (this.to.addonTop.onClick) {
      this.to.addonTop.onClick(this.to, this, $event);
    }
  }
}
