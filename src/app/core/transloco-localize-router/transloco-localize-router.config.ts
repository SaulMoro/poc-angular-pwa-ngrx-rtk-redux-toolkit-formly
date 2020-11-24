import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';

export interface TranslocoLocalizeRouter {
  readonly routes: Routes;
  readonly config: TranslocoLocalizeRouterConfig;
}

export interface TranslocoLocalizeRouterConfig {
  noPrefixLang?: string;
  langPath: string;
  hrefLangs: boolean;
  hrefLangsBaseUrl: string;
}

export const defaultConfig: TranslocoLocalizeRouterConfig = {
  langPath: ':lang',
  hrefLangs: false,
  hrefLangsBaseUrl: '',
};

export const LOCALIZE_ROUTER_CONFIG = new InjectionToken<TranslocoLocalizeRouterConfig>('LOCALIZE_ROUTER_CONFIG');
