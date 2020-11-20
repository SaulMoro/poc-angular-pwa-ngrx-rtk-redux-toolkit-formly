import { GAEventCategory } from './ga-event-category.enum';

export interface GAEvent {
  name: string;
  category: GAEventCategory;
  label?: string;
  value?: number;
}
