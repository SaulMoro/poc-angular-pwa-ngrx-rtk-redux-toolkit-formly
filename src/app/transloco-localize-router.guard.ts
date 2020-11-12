import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslocoLocalizeRouterGuard implements CanActivate {
  constructor(private router: Router, private translocoService: TranslocoService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const routeLang = route.params?.lang;
    const isDefaultLang = routeLang === this.translocoService.getDefaultLang();
    const isSupportedLang = !isDefaultLang && this.translocoService.isLang(routeLang);

    if (isSupportedLang) {
      this.translocoService.setActiveLang(routeLang);
    }

    return isSupportedLang || this.router.parseUrl('/404');
  }
}
