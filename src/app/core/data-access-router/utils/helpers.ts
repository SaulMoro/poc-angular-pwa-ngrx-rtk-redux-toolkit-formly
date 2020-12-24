import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { RouterStateUrl } from '../+state/router.model';

export const isRouterNavigation = (action: any): action is RouterNavigationAction<RouterStateUrl> =>
  action.type === ROUTER_NAVIGATION;

export const matchRoute = (routeCheck: string | string[] | RegExp, route: string): boolean =>
  Array.isArray(routeCheck)
    ? routeCheck.indexOf(route) > -1
    : routeCheck instanceof RegExp
    ? routeCheck.test(route)
    : routeCheck === route;

export const sameRoute = ({ route, prevRoute }: RouterStateUrl): boolean => route === prevRoute;
export const samePage = ({ page, prevPage }: RouterStateUrl): boolean => page === prevPage;
