import { isBrowser } from '@ngneat/transloco';

/**
 * Returns the language in current route, e.g. "en"
 */
export function getRouterLang(supportedLangs: string[]): string {
  if (isBrowser() === false) {
    return undefined;
  }

  // Find in pathname
  const path = window.location?.pathname;
  let lang = path?.split('/')[1];

  // Find in hash
  if (!lang) {
    const hash = window.location?.hash.replace('#', '');
    lang = hash?.split('/')[1];
  }

  return supportedLangs.find((supportedLang) => supportedLang === lang);
}
