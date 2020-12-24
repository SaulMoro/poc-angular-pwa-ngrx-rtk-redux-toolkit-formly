import { Params, Data } from '@angular/router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl, ROUTER_FEATURE_KEY } from './router.model';

export const getRouter = createFeatureSelector<RouterReducerState<RouterStateUrl>>(ROUTER_FEATURE_KEY);

export const getState = createSelector(getRouter, (router: RouterReducerState<RouterStateUrl>) => router?.state);

export const getCurrentRoute = createSelector(getState, (state: RouterStateUrl) => state?.route);

export const getCurrentUrl = createSelector(getState, (state: RouterStateUrl) => state?.url);

export const getCurrentPage = createSelector(getState, (state: RouterStateUrl) => state?.page);

export const getQueryParams = createSelector(getState, (state: RouterStateUrl) => state?.queryParams);

export const getParams = createSelector(getState, (state: RouterStateUrl) => state?.params);

export const getIdParam = createSelector(getParams, (params: Params): string => params?.id);

export const getLangParam = createSelector(getParams, (params: Params) => params?.lang);

export const getData = createSelector(getState, (state: RouterStateUrl) => state?.data);

export const getTitleData = createSelector(getData, (data: Data) => data?.title);
