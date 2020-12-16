import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import * as UiActions from './ui.actions';
import { ThemeService } from '../services/theme.service';

@Injectable()
export class UiEffects {
  changeTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.changeTheme),
        tap(({ theme }) => this.themeService.setTheme(theme)),
        tap(({ theme }) =>
          this.googleAnalytics.sendEvent({
            name: 'Changed Theme',
            category: GAEventCategory.INTERACTION,
            label: theme,
          })
        )
      ),
    { dispatch: false }
  );

  trackGAOnChangedLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.changeLanguage),
        tap(({ language }) =>
          this.googleAnalytics.sendEvent({
            name: 'Changed Language',
            category: GAEventCategory.INTERACTION,
            label: language,
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private themeService: ThemeService,
    private googleAnalytics: GoogleAnalyticsService
  ) {}
}
