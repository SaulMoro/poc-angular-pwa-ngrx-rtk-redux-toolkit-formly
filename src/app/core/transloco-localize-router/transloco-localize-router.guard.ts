import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanDeactivate,
} from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { TranslocoLocalizeRouterService } from './transloco-localize-router.service';

@Injectable({ providedIn: 'root' })
export class TranslocoLocalizeRouterGuard implements CanActivate, CanDeactivate<void> {
  constructor(
    private transloco: TranslocoService,
    private translocoLocalizeRouter: TranslocoLocalizeRouterService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const lang = route.params?.lang;
    const isSupportedLang = this.translocoLocalizeRouter.isSupportedLang(lang);
    if (isSupportedLang) {
      this.transloco.setActiveLang(lang);
    }
    return isSupportedLang || this.router.parseUrl('/');
  }

  canDeactivate(): boolean {
    this.transloco.setActiveLang(this.translocoLocalizeRouter.noPrefixLang);
    return true;
  }
}
