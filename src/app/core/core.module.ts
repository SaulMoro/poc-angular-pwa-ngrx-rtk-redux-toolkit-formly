import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveComponentModule } from '@ngrx/component';

import { environment } from '@environments/environment';
import { TranslocoRootModule } from './transloco-root.module';
import { DataAccessCoreModule } from './data-access-core';
import { DataAccessRouterModule } from './data-access-router';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    // angular
    HttpClientModule,
    TranslocoRootModule,

    // ngrx
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    // core data access
    DataAccessCoreModule,
    DataAccessRouterModule,
  ],
  exports: [LayoutModule, ReactiveComponentModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
