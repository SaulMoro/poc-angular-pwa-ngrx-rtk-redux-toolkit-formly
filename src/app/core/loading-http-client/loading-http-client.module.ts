import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { throwIfAlreadyLoaded } from '../utils';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

const EXPORTED_DECLARATIONS = [LoadingScreenComponent];
const EXPORTED_IMPORTS = [HttpClientModule];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [CommonModule, ...EXPORTED_IMPORTS],
  exports: [...EXPORTED_DECLARATIONS, ...EXPORTED_IMPORTS],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
})
export class LoadingHttpClientModule {
  constructor(@Optional() @SkipSelf() parentModule: HttpClientModule) {
    throwIfAlreadyLoaded(parentModule, HttpClientModule.name);
  }
}
