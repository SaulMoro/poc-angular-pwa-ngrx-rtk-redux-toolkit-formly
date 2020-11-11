import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Route } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { environment } from '@environments/environment';

import { RouterStateUrl } from './router.model';

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  private lastRoute = '';

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let routeSnapshot: ActivatedRouteSnapshot = routerState.root;
    let route = '';
    while (routeSnapshot.firstChild) {
      routeSnapshot = routeSnapshot.firstChild;
      route = route.concat(routeSnapshot.routeConfig?.path ? `/${routeSnapshot.routeConfig.path}` : '');
    }

    const { params, data, queryParams } = routeSnapshot;

    const state = {
      url: routerState.url,
      route: this._removeLangFromRoute(route),
      prevRoute: this.lastRoute,
      queryParams,
      params,
      data,
    };
    this.lastRoute = state.route;

    return state;
  }

  private _removeLangFromRoute(route: string): string {
    const lang: string = (environment as any).supportedLanguages?.find((language) => route.startsWith(`/${language}`));
    return lang ? route.slice(lang.length + 1) : route;
  }
}
