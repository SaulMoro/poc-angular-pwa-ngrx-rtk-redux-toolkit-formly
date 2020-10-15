import { Params } from '@angular/router';
import { Action } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { OperatorFunction, pipe } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { RouterStateUrl } from '../+state/router.model';

export function ofRoute(route: string | string[] | RegExp): OperatorFunction<Action, RouterStateUrl> {
  return pipe(
    ofType(ROUTER_NAVIGATION),
    mapToRouterState(),
    filter(({ route: routePath }) =>
      Array.isArray(route)
        ? route.indexOf(routePath) > -1
        : route instanceof RegExp
        ? route.test(routePath)
        : routePath === route
    )
  );
}

export function ofRouteEnter(routeCheck: string | string[] | RegExp): OperatorFunction<Action, RouterStateUrl> {
  return pipe(
    ofRoute(routeCheck),
    filter(({ route, prevRoute }) => route !== prevRoute)
  );
}

export function ofRouteFilter(routeCheck: string | string[] | RegExp): OperatorFunction<Action, Params> {
  return pipe(
    ofRoute(routeCheck),
    filter(({ route, prevRoute }) => route === prevRoute),
    map(({ queryParams }) => ({ ...queryParams, page: null })),
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
  );
}

export function ofRoutePageChange(routeCheck: string | string[] | RegExp): OperatorFunction<Action, number> {
  return pipe(
    ofRoute(routeCheck),
    distinctUntilChanged((prev, curr) => prev.queryParams?.page === curr.queryParams?.page),
    filter(({ route, prevRoute, queryParams }) => route === prevRoute && !!queryParams.page),
    map(({ queryParams }) => +queryParams.page)
  );
}

export function mapToRouterState(): OperatorFunction<Action, RouterStateUrl> {
  return map((action: RouterNavigationAction<RouterStateUrl>) => action.payload.routerState);
}

export function mapToParam<T>(key: string): OperatorFunction<RouterStateUrl, T> {
  return map<RouterStateUrl, T>((state) => state.params[key]);
}

export function mapToQueryParam<T>(key: string): OperatorFunction<RouterStateUrl, T> {
  return map<RouterStateUrl, T>((state) => state.queryParams[key]);
}

export function mapToData<T>(key: string): OperatorFunction<RouterStateUrl, T> {
  return map<RouterStateUrl, T>((state) => state.data[key]);
}
