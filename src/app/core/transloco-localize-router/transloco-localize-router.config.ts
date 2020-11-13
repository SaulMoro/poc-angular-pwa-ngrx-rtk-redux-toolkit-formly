import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslocoLocalizeRouterModule } from './transloco-localize-router.module';
import { localizeRoutes } from './transloco-lozalize-router';

export interface TranslocoLocalizeRouter {
  readonly routes: Routes;
  readonly config: TranslocoLocalizeRouterConfig;
}

export interface TranslocoLocalizeRouterConfig {
  alwaysPrefix: boolean;
  langPath: string;
}

export const defaultConfig: TranslocoLocalizeRouterConfig = {
  alwaysPrefix: false,
  langPath: ':lang',
};

export const initTranslocoLocalizeRouter = (
  routes: Routes,
  config?: Partial<TranslocoLocalizeRouterConfig>
): TranslocoLocalizeRouter => {
  const translocoLocalizeRouterConfig = { ...defaultConfig, ...config };
  return {
    routes: localizeRoutes(routes, translocoLocalizeRouterConfig),
    config: translocoLocalizeRouterConfig,
  };
};

export const LOCALIZE_ROUTER_CONFIG = new InjectionToken<TranslocoLocalizeRouterConfig>('LOCALIZE_ROUTER_CONFIG');
export const LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken<TranslocoLocalizeRouterModule>(
  'LOCALIZE_ROUTER_FORROOT_GUARD'
);
