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
  let lang = supportedLangs.find((supportedLang) => supportedLang === path?.split('/')[1]);

  // Find in hash
  if (!lang && window.location?.hash) {
    const hash = window.location.hash.replace('#', '');
    lang = supportedLangs.find((supportedLang) => supportedLang === hash.split('/')[1]);
  }

  return lang;
}
