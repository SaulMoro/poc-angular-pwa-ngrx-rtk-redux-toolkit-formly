import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Event, NavigationEnd, Router, Routes } from '@angular/router';
import { from } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';

import { LOCALIZE_ROUTER_CONFIG, TranslocoLocalizeRouterConfig } from './transloco-localize-router.config';
import { TranslocoLocalizeRouterService } from './transloco-localize-router.service';
import { TranslocoLocalizeRouterGuard } from './transloco-localize-router.guard';

@Injectable({ providedIn: 'root' })
export class TranslocoLocalizeRouterLoader {
  constructor(
    @Inject(LOCALIZE_ROUTER_CONFIG) private config: TranslocoLocalizeRouterConfig,
    @Inject(DOCUMENT) private document: Document,
    private localizeRouterSrv: TranslocoLocalizeRouterService,
    private router: Router,
  ) {
    this.localizeRoutes(this.router.config, this.config);

    if (this.config.hrefLangs) {
      this.hrefLangs();
    }
  }

  private localizeRoutes(routes: Routes, { noPrefixLang, langPath }: Partial<TranslocoLocalizeRouterConfig>): void {
    const hasWildCard = routes[routes.length - 1]?.path === '**';
    const localizedRoutes = !noPrefixLang
      ? [
          { path: '', redirectTo: noPrefixLang, pathMatch: 'full' },
          {
            path: langPath,
            canActivate: [TranslocoLocalizeRouterGuard],
            children: [...routes],
          },
        ]
      : [
          ...(hasWildCard ? routes.slice(0, -1) : routes),
          {
            path: langPath,
            canActivate: [TranslocoLocalizeRouterGuard],
            canDeactivate: [TranslocoLocalizeRouterGuard],
            children: [...routes],
          },
          ...(hasWildCard ? [routes[routes.length - 1]] : []),
        ];

    this.router.resetConfig(localizedRoutes);
  }

  private hrefLangs(): void {
    const links: HTMLLinkElement[] = (this.localizeRouterSrv.availableLangs as string[]).map((lang: string) => {
      const link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', !this.localizeRouterSrv.showPrefix(lang) ? 'x-default' : lang);
      this.document.head.appendChild(link);
      return link;
    });

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map((event: Event) => (event as NavigationEnd).urlAfterRedirects),
        concatMap((route) => from(links).pipe(map((link) => ({ link, route })))),
        tap(({ link, route }) => {
          const lang = link.getAttribute('hreflang') || undefined;
          const fixedRoute: string = this.localizeRouterSrv.translateRoute(
            route.replace(`/${this.localizeRouterSrv.activeLang}/`, '/'),
            lang === 'x-default' ? this.localizeRouterSrv.noPrefixLang : lang,
          );
          link.setAttribute('href', `${this.config.hrefLangsBaseUrl}${fixedRoute}`);
        }),
      )
      .subscribe();
  }
}
