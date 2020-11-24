import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { from } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';

import { LOCALIZE_ROUTER_CONFIG, TranslocoLocalizeRouterConfig } from './transloco-localize-router.config';

let service: TranslocoLocalizeRouterService;

export function translateRoute<T = any>(route: string | any[], lang?: string): T {
  return service.translateRoute(route, lang);
}

@Injectable({ providedIn: 'root' })
export class TranslocoLocalizeRouterService {
  constructor(
    @Inject(LOCALIZE_ROUTER_CONFIG) private config: TranslocoLocalizeRouterConfig,
    @Inject(DOCUMENT) private document: Document,
    private transloco: TranslocoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    service = this;

    if (this.config.hrefLangs) {
      this.hrefLangs();
    }
  }

  translateRoute<T = any>(route: string | any[], lang: string = this.transloco.getActiveLang()): T {
    const startPath = this.showPrefix(lang) ? `/${lang}` : '';
    const translatedRoute = Array.isArray(route)
      ? startPath
        ? [startPath, ...route?.map((path: string) => String(path).replace('/', '')).filter(Boolean)]
        : [...route]
      : startPath + (route || '/');

    return translatedRoute as any;
  }

  changeLanguage(lang: string, extras: NavigationExtras = {}): void {
    const currentLang = this.transloco.getActiveLang();
    if (lang !== currentLang) {
      const route = this.router.url.split('?')[0]?.replace(`/${currentLang}/`, '/');
      const queryParams = this.route.snapshot.queryParams;
      this.router.navigate([this.translateRoute(route, lang)], {
        ...extras,
        queryParams: {
          ...queryParams,
          ...extras.queryParams,
        },
      });
    }
  }

  showPrefix(lang: string): boolean {
    return lang !== this.noPrefixLang;
  }

  isSupportedLang(lang: string): boolean {
    return this.showPrefix(lang) && this.transloco.isLang(lang);
  }

  get noPrefixLang(): string {
    return this.config.noPrefixLang;
  }

  private hrefLangs(): void {
    const links: HTMLLinkElement[] = (this.transloco.getAvailableLangs() as string[]).map((lang: string) => {
      const link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', !this.showPrefix(lang) ? 'x-default' : lang);
      this.document.head.appendChild(link);
      return link;
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects),
        concatMap((route) => from(links).pipe(map((link) => ({ link, route })))),
        tap(({ link, route }) => {
          const currentLang = this.transloco.getActiveLang();
          const lang = link.getAttribute('hreflang');
          const fixedRoute = this.translateRoute(
            route.replace(`/${currentLang}/`, '/'),
            lang === 'x-default' ? this.noPrefixLang : lang
          );
          link.setAttribute('href', `${this.config.hrefLangsBaseUrl}${fixedRoute}`);
        })
      )
      .subscribe();
  }
}
