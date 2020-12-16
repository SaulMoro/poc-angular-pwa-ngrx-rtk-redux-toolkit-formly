export function debounceExtension(field): void {
  if (field.key && !field.modelOptions) {
    field.modelOptions = {
      debounce: { default: 300 },
    };
  }
}
