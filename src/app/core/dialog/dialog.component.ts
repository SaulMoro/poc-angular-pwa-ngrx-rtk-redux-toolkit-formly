import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentDialogConfig, FormDialogConfig } from './models/dialog.model';

export enum IconType {
  Asset,
  MaterialIcon,
  FontAwesome,
}

@Component({
  selector: 'app-web-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  iconTypes = IconType;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ComponentDialogConfig | FormDialogConfig
  ) {}

  get dialogData(): ComponentDialogConfig | FormDialogConfig {
    return this.data;
  }

  getIconType(icon: string): IconType {
    return icon.includes('fa')
      ? IconType.FontAwesome
      : icon.includes('assets')
      ? IconType.Asset
      : IconType.MaterialIcon;
  }
}
