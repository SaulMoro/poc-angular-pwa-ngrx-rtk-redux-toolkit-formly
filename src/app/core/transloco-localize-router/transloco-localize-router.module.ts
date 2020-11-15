import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  defaultConfig,
  LOCALIZE_ROUTER_CONFIG,
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
          useValue: config,
        },
      ],
    };
  }

  // required init context for translateRoute function
  constructor(private translocoLocalizeRouter: TranslocoLocalizeRouterService) {}
}
