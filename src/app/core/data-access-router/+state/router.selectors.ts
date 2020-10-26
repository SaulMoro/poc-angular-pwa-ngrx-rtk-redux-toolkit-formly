import { Params, Data } from '@angular/router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';

import { RouterStateUrl, ROUTER_FEATURE_KEY } from './router.model';

export const getRouter = createFeatureSelector<RouterReducerState<RouterStateUrl>>(ROUTER_FEATURE_KEY);

export const {
  selectQueryParams, // select the current route query params
  selectRouteParams, // select the current route params
  selectRouteData, // select the current route data
} = getSelectors(getRouter);

export const getRouterState = createSelector(getRouter, (router: RouterReducerState<RouterStateUrl>) => router?.state);

export const getCurrentRoute = createSelector(getRouterState, (state: RouterStateUrl) => state?.route);

export const getCurrentUrl = createSelector(getRouterState, (state: RouterStateUrl) => state?.url);

export const getRouteQueryParams = createSelector(getRouterState, (state: RouterStateUrl) => state?.queryParams);

export const getRouteQueryParam = createSelector(
  getRouteQueryParams,
  (params: Params, paramName: string) => paramName && params?.paramName
);

export const getRouteParams = createSelector(getRouterState, (state: RouterStateUrl) => state?.params);

export const getRouteParam = createSelector(
  getRouteParams,
  (params: Params, paramName: string) => paramName && params?.paramName
);

export const getRouteIdParam = createSelector(getRouteParams, (params: Params) => params?.id);

export const getRouteData = createSelector(getRouterState, (state: RouterStateUrl) => state?.data);

export const getRouteTitleData = createSelector(getRouteData, (data: Data) => data?.title);
