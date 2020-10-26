/**
 * Interface for the 'Forms' data
 */
export interface FormsEntity {
  formId: string; // Primary ID
  model: any;
  valid: boolean;
  previousModel: any;
}
