import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  defaultConfig,
  LOCALIZE_ROUTER_CONFIG,
  TranslocoLocalizeRouterConfig,
} from './transloco-localize-router.config';
import { TranslocoLocalizeRouterLoader } from './transloco-lozalize-router.loader';
import { TranslocoLocalizeRouterService } from './transloco-localize-router.service';
import { TranslocoLocalizeRouterPipe } from './transloco-localize-router.pipe';

const EXPORTED_DECLARATIONS = [TranslocoLocalizeRouterPipe];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  exports: [...EXPORTED_DECLARATIONS],
})
export class TranslocoLocalizeRouterModule {
  static forRoot(config: Partial<TranslocoLocalizeRouterConfig>): ModuleWithProviders<TranslocoLocalizeRouterModule> {
    return {
      ngModule: TranslocoLocalizeRouterModule,
      providers: [
        {
          provide: LOCALIZE_ROUTER_CONFIG,
          useValue: { ...defaultConfig, ...config },
        },
      ],
    };
  }

  // Init loader and service context
  constructor(
    private localizeRouterSrv: TranslocoLocalizeRouterService,
    private loader: TranslocoLocalizeRouterLoader,
  ) {}
}
