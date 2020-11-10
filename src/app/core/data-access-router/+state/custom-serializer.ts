import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { environment } from '@environments/environment';

import { RouterStateUrl } from './router.model';

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  private lastRoute = '';

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let routeSnapshot: ActivatedRouteSnapshot = routerState.root;
    while (routeSnapshot.firstChild) {
      routeSnapshot = routeSnapshot.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params, data } = routeSnapshot;
    const { route, lang } = extractRouteInfo(url, params);

    const state = {
      url,
      route,
      prevRoute: this.lastRoute,
      queryParams,
      params,
      data,
      lang,
    };
    this.lastRoute = state.route;

    return state;
  }
}

export function extractRouteInfo(url: string, params): { route: string; lang: string } {
  const paramsAuxArray = Object.entries(params);
  let urlSegments = url
    .split('?')[0]
    .split('/')
    .filter((str) => !!str);

  const lang = environment.supportedLanguages.find((supportedLanguages) => supportedLanguages === urlSegments[0]);
  urlSegments = lang ? urlSegments.slice(1) : urlSegments;

  const genericUrlSegments = urlSegments.map((segment) => {
    const paramFoundIndex = paramsAuxArray.findIndex(([key, value]) => value === segment);
    if (paramFoundIndex !== -1) {
      const paramFound = paramsAuxArray.splice(paramFoundIndex, 1)[0];
      return `:${paramFound[0]}`;
    }
    return segment;
  });

  return {
    route: `${url ? '/' : ''}${genericUrlSegments.join('/').split('?')[0]}`,
    lang: lang ?? environment.defaultLanguage,
  };
}
