import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import * as SettingsActions from './settings.actions';
import * as SettingsSelectors from './settings.selectors';
import { Language } from '../../models';

@Injectable()
export class SettingsEffects {
  setTranslateServiceLanguage = createEffect(
    () =>
      this.store.pipe(
        select(SettingsSelectors.getSelectedLanguage),
        distinctUntilChanged(),
        map(
          (language) =>
            language ??
            (environment.supportedLanguages
              .reduce((total, curr) => [...total, curr], [])
              .includes(this.translateService.getBrowserLang())
              ? this.translateService.getBrowserLang()
              : environment.defaultLanguage)
        ),
        tap((language) => this.translateService.use(language))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store, private translateService: TranslateService) {}
}
