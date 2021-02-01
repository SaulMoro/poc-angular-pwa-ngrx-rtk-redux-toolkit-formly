import { Observable } from 'rxjs';

export interface SelectOption {
  label: string;
  value: string | null;
}

export type SelectOptions = SelectOption[] | Observable<SelectOption[]>;
