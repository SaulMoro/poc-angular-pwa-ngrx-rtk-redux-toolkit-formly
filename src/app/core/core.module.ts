import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveComponentModule } from '@ngrx/component';

import { environment } from '@environments/environment';
import { TranslocoRootModule } from './transloco-root.module';
import { reducers } from './core.state';
import { UiEffects } from './ui';
import { GoogleAnalyticsEffects } from './google-analytics';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    // angular
    HttpClientModule,
    TranslocoRootModule,

    // ngrx
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([UiEffects, GoogleAnalyticsEffects]),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
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
