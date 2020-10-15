import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { throwIfAlreadyLoaded } from '@app/shared/utils';
import { Logger } from '@app/core/services';
import { DataAccessRouterModule } from '@app/core/data-access-router';
import { DataAccessFormsModule } from '@app/core/data-access-forms';
import { DataAccessUiModule } from '@app/core/data-access-ui';
import { environment } from '@environments/environment';
import { DialogModule } from './dialog/dialog.module';
import { LayoutModule } from './layout/layout.module';
import { LoadingHttpClientModule } from './loading-http-client';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const EXPORTED_IMPORTS = [LayoutModule, LoadingHttpClientModule, MatSnackBarModule];

const log = new Logger('App');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

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

    ...EXPORTED_IMPORTS,
    DialogModule.forRoot(),
    DataAccessRouterModule,
    DataAccessFormsModule,
    DataAccessUiModule,
  ],
  exports: [TranslateModule, ...EXPORTED_IMPORTS],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, private translateService: TranslateService) {
    throwIfAlreadyLoaded(parentModule, CoreModule.name);
    this.initApp();
  }

  initApp(): void {
    if (environment.production) {
      Logger.enableProductionMode();
    }
    log.debug('Initializing App', environment);

    // Setup translations
    this.translateService.use('es');
  }
}
