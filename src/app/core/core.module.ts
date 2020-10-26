import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DataAccessRouterModule } from '@app/core/data-access-router';
import { DataAccessFormsModule } from '@app/core/data-access-forms';
import { DataAccessUiModule } from '@app/core/data-access-ui';
import { environment } from '@environments/environment';
import { throwIfAlreadyLoaded } from './utils';
import { LayoutModule } from './layout/layout.module';
import { LoadingHttpClientModule } from './loading-http-client';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const EXPORTED_IMPORTS = [LoadingHttpClientModule];

@NgModule({
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,

    // Third party
    ...EXPORTED_IMPORTS,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatSnackBarModule,

    // NgRx
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

    // Core data access
    DataAccessRouterModule,
    DataAccessFormsModule,
    DataAccessUiModule,
  ],
  exports: [...EXPORTED_IMPORTS, LayoutModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, private translateService: TranslateService) {
    throwIfAlreadyLoaded(parentModule, CoreModule.name);
    this.initApp();
  }

  initApp(): void {
    this.translateService.use('es');
  }
}
