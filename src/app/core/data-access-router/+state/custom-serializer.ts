import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

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

    const state = {
      url,
      route: extractRoute(url, params),
      prevRoute: this.lastRoute,
      queryParams,
      params,
      data,
    };
    this.lastRoute = state.route;

    return state;
  }
}

export function extractRoute(url, params): string {
  if (url && params) {
    const paramsAuxArray = Object.entries(params);
    const urlSegments = url
      .split('?')[0]
      .split('/')
      .filter((str) => !!str);
    const genericUrlSegments = urlSegments.map((segment) => {
      const paramFoundIndex = paramsAuxArray.findIndex(([key, value]) => value === segment);
      if (paramFoundIndex !== -1) {
        const paramFound = paramsAuxArray.splice(paramFoundIndex, 1)[0];
        return ':' + paramFound[0];
      }
      return segment;
    });

    const route = '/' + genericUrlSegments.join('/');

    return route.split('?')[0];
  }

  return '';
}
