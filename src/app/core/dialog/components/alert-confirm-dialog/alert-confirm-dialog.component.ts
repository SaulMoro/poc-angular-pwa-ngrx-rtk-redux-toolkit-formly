import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ComponentInsideDialog, ComponentDialogConfig } from '../../models/dialog.model';

export enum DialogType {
  ALERT,
  CONFIRM,
}

@Component({
  selector: 'app-alert-confirm-dialog',
  templateUrl: './alert-confirm-dialog.component.html',
  styleUrls: ['./alert-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertConfirmDialogComponent implements ComponentInsideDialog, OnInit {
  component = AlertConfirmDialogComponent;
  componentDataOut: any;

  content: string[] = this.data.componentDataIn.content;
  showAlertIcon = this.data.componentDataIn.showAlertIcon ?? true;
  isAlert: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private data: ComponentDialogConfig) {}

  ngOnInit(): void {
    this.componentDataOut = this.data.componentDataIn;
    this.isAlert = this.data.componentDataIn.type.valueOf() === DialogType.ALERT.valueOf();
  }
}
