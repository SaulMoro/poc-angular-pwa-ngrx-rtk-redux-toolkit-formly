import { Type, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FormGroup } from '@angular/forms';

import { Option } from '@app/shared/models';

export interface ComponentInsideDialog {
  component: ComponentType<any> | TemplateRef<any>;
  componentDataOut: any;
}

export interface FormInsideDialog {
  form: FormGroup;
}

interface BaseDialogConfig {
  title?: string;
  icon?: string;
  showDefaultButtons?: boolean;
  acceptText?: string;
  cancelText?: string;
}

export interface ComponentDialogConfig extends BaseDialogConfig {
  component: Type<ComponentInsideDialog>;
  componentDataIn: any;
}

export interface FormDialogConfig extends BaseDialogConfig {
  component: Type<FormInsideDialog>;
}

export interface AlertDialogConfig extends BaseDialogConfig {
  content: string[];
}

export interface ConfirmDialogConfig extends BaseDialogConfig {
  content: string[];
  showDefaultButtons: boolean;
  showAlertIcon?: boolean;
}

export interface ContextMenuDialogConfig {
  options: Option[];
  event: MouseEvent;
}
