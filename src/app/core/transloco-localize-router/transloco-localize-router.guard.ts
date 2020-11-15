import { Inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanDeactivate,
} from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { LOCALIZE_ROUTER_CONFIG, TranslocoLocalizeRouterConfig } from '.';

@Injectable({ providedIn: 'root' })
export class TranslocoLocalizeRouterGuard implements CanActivate, CanDeactivate<void> {
  constructor(
    private transloco: TranslocoService,
    private router: Router,
    @Inject(LOCALIZE_ROUTER_CONFIG) private config: TranslocoLocalizeRouterConfig
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const lang = route.params?.lang;
    const isSupportedLang = this.transloco.isLang(lang);
    if (isSupportedLang) {
      this.transloco.setActiveLang(lang);
    }
    return isSupportedLang || this.router.parseUrl('/');
  }

  canDeactivate(): boolean {
    this.transloco.setActiveLang(this.config.noPrefixLang);
    return true;
  }
}
