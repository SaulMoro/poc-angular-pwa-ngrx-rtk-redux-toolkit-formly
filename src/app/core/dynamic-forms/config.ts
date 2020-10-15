export function applyDefaultOptions(field: any): void {
  if (field.key && !field.modelOptions) {
    field.modelOptions = {
      debounce: { default: 300 },
    };
  }
}
