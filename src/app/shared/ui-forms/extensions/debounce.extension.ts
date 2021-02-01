import { FormlyFieldConfig } from '@ngx-formly/core';

export function debounceExtension(field: FormlyFieldConfig): void {
  if (field.key && !field.modelOptions) {
    field.modelOptions = {
      debounce: { default: 300 },
    };
  }
}
