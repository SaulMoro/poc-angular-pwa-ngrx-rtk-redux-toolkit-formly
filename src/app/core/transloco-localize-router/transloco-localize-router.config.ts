import { InjectionToken } from '@angular/core';
import { TranslocoLocalizeRouterModule } from './transloco-localize-router.module';

export interface TranslocoLocalizeRouterConfig {
  alwaysPrefix: boolean;
}

export const defaultConfig: TranslocoLocalizeRouterConfig = {
  alwaysPrefix: false,
};

export const LOCALIZE_ROUTER_CONFIG = new InjectionToken<TranslocoLocalizeRouterConfig>('LOCALIZE_ROUTER_CONFIG');
export const LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken<TranslocoLocalizeRouterModule>(
  'LOCALIZE_ROUTER_FORROOT_GUARD'
);
