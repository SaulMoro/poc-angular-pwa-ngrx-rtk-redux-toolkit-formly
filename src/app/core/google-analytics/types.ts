export interface GAEvent {
  name: string;
  category: GAEventCategory;
  label?: string;
  value?: number;
}

export interface GAPageView {
  url: string;
  title?: string;
}

export enum GAEventCategory {
  ENGAGEMENT = 'engagement',
  INTERACTION = 'interaction',
  FILTER = 'filter',
}
