import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoLocalizeRouterGuard implements CanActivate {
  constructor(private transloco: TranslocoService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.transloco.isLang(route.params?.lang) || this.router.parseUrl('/');
  }
}
