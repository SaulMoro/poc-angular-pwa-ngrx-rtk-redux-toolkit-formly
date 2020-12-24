import { Action } from '@ngrx/store';
import { RouterNavigationAction } from '@ngrx/router-store';
import { Observable, OperatorFunction, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { RouterStateUrl } from '../+state/router.model';
import { samePage, matchRoute, isRouterNavigation, sameRoute } from './helpers';

export type RouteMatcher = (state: RouterStateUrl) => boolean;

export const matchRouteEnter: RouteMatcher = (state: RouterStateUrl) => !sameRoute(state);
export const matchRouteFilter: RouteMatcher = (state: RouterStateUrl) => sameRoute(state) && state.page === null;
export const matchRoutePageChange: RouteMatcher = (state: RouterStateUrl) =>
  sameRoute(state) && state.page !== null && !samePage(state);

/*
  Matcher operators
*/

export const isRoute = (routeToCheck: string | string[] | RegExp, ...anyOfMatchers: RouteMatcher[]) => (
  action: any
): action is RouterNavigationAction<RouterStateUrl> =>
  isRouterNavigation(action) &&
  matchRoute(routeToCheck, action.payload.routerState.route) &&
  anyOfMatchers.some((matcher) => matcher(action.payload.routerState));

export const isRouteEnter = (routeToCheck: string | string[] | RegExp) => isRoute(routeToCheck, matchRouteEnter);
export const isRouteFilter = (routeToCheck: string | string[] | RegExp) => isRoute(routeToCheck, matchRouteFilter);
export const isRoutePageChange = (routeToCheck: string | string[] | RegExp) =>
  isRoute(routeToCheck, matchRoutePageChange);

/*
  Effects operators
*/

export function ofRoute(
  routeToCheck: string | string[] | RegExp,
  ...anyOfMatchers: RouteMatcher[]
): OperatorFunction<Action, RouterStateUrl> {
  return (actions$: Observable<any>) =>
    actions$.pipe(
      filter(isRoute(routeToCheck, ...anyOfMatchers)),
      map(({ payload: { routerState } }: RouterNavigationAction<RouterStateUrl>) => routerState)
    );
}

export const ofRouteEnter = (routeToCheck: string | string[] | RegExp): OperatorFunction<Action, RouterStateUrl> =>
  pipe(ofRoute(routeToCheck, matchRouteEnter));
export const ofRouteFilter = (routeToCheck: string | string[] | RegExp): OperatorFunction<Action, RouterStateUrl> =>
  pipe(ofRoute(routeToCheck, matchRouteFilter));
export const ofRoutePageChange = (routeToCheck: string | string[] | RegExp): OperatorFunction<Action, RouterStateUrl> =>
  pipe(ofRoute(routeToCheck, matchRoutePageChange));
