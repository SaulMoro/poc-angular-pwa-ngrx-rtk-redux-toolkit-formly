import { APP_INITIALIZER, SkipSelf } from '@angular/core';
import { ModuleWithProviders, NgModule, Optional } from '@angular/core';

import {
  defaultConfig,
  LOCALIZE_ROUTER_CONFIG,
  LOCALIZE_ROUTER_FORROOT_GUARD,
  TranslocoLocalizeRouterConfig,
} from './transloco-localize-router.config';
import { TranslocoLocalizeRouterService } from './transloco-localize-router.service';
import { TranslocoLocalizeRouterPipe } from './transloco-localize-router.pipe';

const EXPORTED_DECLARATIONS = [TranslocoLocalizeRouterPipe];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  exports: [...EXPORTED_DECLARATIONS],
})
export class TranslocoLocalizeRouterModule {
  static forRoot(config: TranslocoLocalizeRouterConfig): ModuleWithProviders<TranslocoLocalizeRouterModule> {
    return {
      ngModule: TranslocoLocalizeRouterModule,
      providers: [
        {
          provide: LOCALIZE_ROUTER_CONFIG,
          useValue: { ...defaultConfig, config },
        },
        {
          provide: LOCALIZE_ROUTER_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[provideForRootGuard, new Optional(), new SkipSelf()]],
        },
      ],
    };
  }

  // required init context for translateRoute function
  constructor(private translocoLocalizeRouter: TranslocoLocalizeRouterService) {}
}

export function provideForRootGuard(translocoLocalizeRouterModule: TranslocoLocalizeRouterModule): string {
  if (translocoLocalizeRouterModule) {
    throw new Error(
      `TranslocoLocalizeRouterModule.forRoot() called twice. Lazy loaded modules should use TranslocoLocalizeRouterModule instead.`
    );
  }
  return 'guarded';
}
