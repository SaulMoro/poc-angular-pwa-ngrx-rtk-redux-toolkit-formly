import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
  routerReducer,
  NavigationActionTiming,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { throwIfAlreadyLoaded } from '@app/shared/utils';
import { CustomSerializer } from './+state/custom-serializer';
import { ROUTER_FEATURE_KEY } from './+state/router.model';

@NgModule({
  imports: [
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTER_FEATURE_KEY,
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    StoreModule.forFeature(ROUTER_FEATURE_KEY, routerReducer),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
})
export class DataAccessRouterModule {
  constructor(@Optional() @SkipSelf() parentModule: DataAccessRouterModule) {
    throwIfAlreadyLoaded(parentModule, DataAccessRouterModule.name);
  }
}
