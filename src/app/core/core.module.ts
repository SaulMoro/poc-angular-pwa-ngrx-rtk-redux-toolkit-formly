import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, RouterState, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ReactiveComponentModule } from '@ngrx/component';

import { environment } from '@environments/environment';
import { TranslocoRootModule } from './transloco-root.module';
import { DataAccessRouterModule } from './data-access-router';
import { DataAccessUiModule } from './data-access-ui';
import { GoogleAnalyticsEffects } from './google-analytics';
import { LayoutModule } from './layout/layout.module';
import { CustomSerializer } from './data-access-router/+state/custom-serializer';

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
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    EffectsModule.forRoot([GoogleAnalyticsEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    // core data access
    DataAccessRouterModule,
    DataAccessUiModule,
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
