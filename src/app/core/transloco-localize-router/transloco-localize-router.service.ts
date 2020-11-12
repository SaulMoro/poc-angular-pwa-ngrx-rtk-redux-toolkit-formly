import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { LOCALIZE_ROUTER_CONFIG, TranslocoLocalizeRouterConfig } from './transloco-localize-router.config';

let service: TranslocoLocalizeRouterService;

export function translateRoute(route: string | any[], lang?: string): string | any[] {
  return service.translate(route, lang);
}

@Injectable({ providedIn: 'root' })
export class TranslocoLocalizeRouterService {
  constructor(
    @Inject(LOCALIZE_ROUTER_CONFIG) private config: TranslocoLocalizeRouterConfig,
    private transloco: TranslocoService,
    private router: Router
  ) {
    service = this;
  }

  translate(route: string | any[], lang: string = this.transloco.getActiveLang()): string | any[] {
    const isDefaultLang = lang === this.transloco.getDefaultLang();
    const startPath = !isDefaultLang || this.config.alwaysPrefix ? `/${lang}` : '';

    return route && Array.isArray(route)
      ? startPath
        ? [startPath, ...route.map((routes: string) => routes.replace('/', '')).filter(Boolean)]
        : [...route]
      : startPath + (route ?? '');
  }

  changeLanguage(lang: string): void {
    if (lang !== this.transloco.getActiveLang()) {
      // this.router.url
    }
  }
}
