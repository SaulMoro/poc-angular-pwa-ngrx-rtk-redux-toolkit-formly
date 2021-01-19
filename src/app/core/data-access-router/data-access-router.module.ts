import { NgModule } from '@angular/core';
import { RouterStateSerializer, StoreRouterConnectingModule, routerReducer, RouterState } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { CustomSerializer } from './+state/custom-serializer';
import { ROUTER_FEATURE_KEY } from './+state/router.model';

@NgModule({
  imports: [
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal, stateKey: ROUTER_FEATURE_KEY }),
    StoreModule.forFeature(ROUTER_FEATURE_KEY, routerReducer),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
})
export class DataAccessRouterModule {}
