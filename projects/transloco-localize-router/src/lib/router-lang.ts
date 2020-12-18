import { isBrowser } from '@ngneat/transloco';

/**
 * Returns the language in current route, e.g. "en"
 */
export function getRouterLang(supportedLangs: string[]): string | undefined {
  if (isBrowser() === false) {
    return undefined;
  }

  // Find in pathname
  const path = window.location?.pathname;
  const lang = path?.split('/')[1];
  let foundLang = lang && supportedLangs.find((supportedLang) => supportedLang === lang);

  // Find in hash
  if (!foundLang && window.location?.hash) {
    const hash = window.location.hash.replace('#', '');
    const hashLang = hash.split('/')[1];
    foundLang = hashLang && supportedLangs.find((supportedLang) => supportedLang === hashLang);
  }

  return foundLang;
}
