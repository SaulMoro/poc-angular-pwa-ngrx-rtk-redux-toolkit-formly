export interface Option {
  id: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  subOptions?: Option[];
  data?: any;
}
