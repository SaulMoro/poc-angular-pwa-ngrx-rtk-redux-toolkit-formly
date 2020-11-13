import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { LOCALIZE_ROUTER_CONFIG, TranslocoLocalizeRouterConfig } from './transloco-localize-router.config';

let service: TranslocoLocalizeRouterService;

export function translateRoute(route: string | any[], lang?: string): string | any[] {
  return service?.translate(route, lang);
}

@Injectable({ providedIn: 'root' })
export class TranslocoLocalizeRouterService {
  constructor(
    @Inject(LOCALIZE_ROUTER_CONFIG) private config: TranslocoLocalizeRouterConfig,
    private transloco: TranslocoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    service = this;
  }

  translate(route: string | any[], lang: string = this.transloco.getActiveLang()): string | any[] {
    const startPath = this._showPrefix(lang) ? `/${lang}` : '';

    return route && Array.isArray(route)
      ? startPath
        ? [startPath, ...route?.map((routes: string) => routes.replace('/', '')).filter(Boolean)]
        : [...route]
      : startPath + (route || '/');
  }

  changeLanguage(lang: string, extras: NavigationExtras = {}): void {
    const currentLang = this.transloco.getActiveLang();
    if (lang && lang !== currentLang) {
      const route = this.router.url.split('?')[0]?.replace(`/${currentLang}/`, '/');
      const queryParams = this.route.snapshot.queryParams;
      this.router.navigate([this.translate(route, lang) as string], {
        ...extras,
        queryParams: {
          ...queryParams,
          ...extras.queryParams,
        },
      });
    }
  }

  private _showPrefix(lang: string): boolean {
    return this.config.alwaysPrefix || lang !== this.transloco.getDefaultLang();
  }
}
