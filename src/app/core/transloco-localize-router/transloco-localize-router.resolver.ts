import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslocoLocalizeRouterResolver implements Resolve<void> {
  constructor(private transloco: TranslocoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const lang = route.params?.lang ?? this.transloco.getDefaultLang();
    if (lang !== this.transloco.getActiveLang()) {
      this.transloco.setActiveLang(lang);
    }
  }
}
