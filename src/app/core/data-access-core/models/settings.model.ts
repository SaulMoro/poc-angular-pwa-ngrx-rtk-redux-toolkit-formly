import { environment } from '@environments/environment';

export type Language = typeof environment.supportedLanguages[number];

export interface Settings {
  language: string;
  // ...
}
