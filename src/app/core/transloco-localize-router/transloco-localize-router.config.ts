import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';

export interface TranslocoLocalizeRouter {
  readonly routes: Routes;
  readonly config: TranslocoLocalizeRouterConfig;
}

export interface TranslocoLocalizeRouterConfig {
  alwaysPrefix: boolean;
  noPrefixLang: string;
  langPath: string;
}

export const defaultConfig: TranslocoLocalizeRouterConfig = {
  alwaysPrefix: false,
  noPrefixLang: 'en',
  langPath: ':lang',
};

export const LOCALIZE_ROUTER_CONFIG = new InjectionToken<TranslocoLocalizeRouterConfig>('LOCALIZE_ROUTER_CONFIG');
