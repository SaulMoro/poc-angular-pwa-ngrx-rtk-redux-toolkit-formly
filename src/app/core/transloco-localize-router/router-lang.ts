import { isBrowser } from '@ngneat/transloco';

/**
 * Returns the language in current route, e.g. "en"
 */
export function getRouterLang(supportedLangs: string[]): string {
  if (isBrowser() === false) {
    return undefined;
  }

  const path = window.location?.pathname;
  const lang = path?.split('/')[1];
  return supportedLangs.find((supportedLang) => supportedLang === lang);
}
