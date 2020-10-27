import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveComponentModule } from '@ngrx/component';

import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

const EXPORTED_DECLARATIONS = [LoadingScreenComponent];
const EXPORTED_IMPORTS = [HttpClientModule];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [CommonModule, ReactiveComponentModule, ...EXPORTED_IMPORTS],
  exports: [...EXPORTED_DECLARATIONS, ...EXPORTED_IMPORTS],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
})
export class LoadingHttpClientModule {
  constructor() {}
}
