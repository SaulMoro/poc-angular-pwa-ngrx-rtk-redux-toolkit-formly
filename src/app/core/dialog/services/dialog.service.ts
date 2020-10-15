import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { DialogComponent } from '../dialog.component';
import { ComponentDialogConfig, ConfirmDialogConfig, AlertDialogConfig } from '../models/dialog.model';
import {
  AlertConfirmDialogComponent,
  DialogType,
} from '../components/alert-confirm-dialog/alert-confirm-dialog.component';
import { CoalescingComponentFactoryResolver } from './coalescing-component-factory-resolver.service';

const defaultConf = { autoFocus: true, panelClass: 'dialog-panel' };

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private coalescingResolver: CoalescingComponentFactoryResolver) {
    this.coalescingResolver.init();
  }

  openComponent(
    config: ComponentDialogConfig,
    disableClose = false,
    hideBackground = false,
    lazyModuleComponentsResolver?: ComponentFactoryResolver
  ): Observable<any> {
    if (lazyModuleComponentsResolver) {
      this.coalescingResolver.registerResolver(lazyModuleComponentsResolver);
    }
    const conf = {
      ...defaultConf,
      disableClose,
      panelClass: hideBackground ? 'dialog-panel--hide-background' : 'full-panel-xs',
      data: config,
    };
    return this._open(conf);
  }

  openAlert(config: AlertDialogConfig, disableClose = false): Observable<boolean> {
    return this.openComponent(
      {
        ...config,
        component: AlertConfirmDialogComponent,
        componentDataIn: { content: config.content, type: DialogType.ALERT },
      },
      disableClose
    ).pipe(map(Boolean));
  }

  openConfirm(config: ConfirmDialogConfig, disableClose = false): Observable<boolean> {
    return this.openComponent(
      {
        ...config,
        component: AlertConfirmDialogComponent,
        componentDataIn: { content: config.content, type: DialogType.CONFIRM, showAlertIcon: config.showAlertIcon },
      },
      disableClose
    ).pipe(map(Boolean));
  }

  private _open(conf): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, conf);
    return dialogRef.afterClosed().pipe(filter(Boolean));
  }
}
