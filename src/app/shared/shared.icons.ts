import { SvgIconType } from '@ngneat/svg-icon/lib/types';

/* eslint-disable max-len */
enum SharedUiIcons {
  back = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
  next = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
  close = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>',
}
/* eslint-enable max-len */

export type SharedUiIcon = keyof typeof SharedUiIcons;

export const icons: SvgIconType[] = Object.entries(SharedUiIcons).map(([name, data]) => ({ name, data }));
