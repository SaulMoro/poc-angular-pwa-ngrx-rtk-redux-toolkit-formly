import { FieldConfig } from '../models/field-config.model';

export function addonsExtension(field: FieldConfig): void {
  if (!field.templateOptions || (field.wrappers && field.wrappers.indexOf('addons') !== -1)) {
    return;
  }

  if (field.templateOptions.addonLeft || field.templateOptions.addonRight || field.templateOptions.addonTop) {
    field.wrappers = [...(field.wrappers || []), 'addons'];
  }
}
