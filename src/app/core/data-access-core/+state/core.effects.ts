import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { TranslocoLocalizeRouterService } from '@app/core/transloco-localize-router';
import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import * as CoreActions from './core.actions';

@Injectable()
export class CoreEffects {
  changeLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.changeLanguage),
        tap(({ lang }) =>
          this.googleAnalytics.sendEvent({
            name: 'Changed Language',
            category: GAEventCategory.INTERACTION,
            label: lang,
          })
        ),
        map(({ lang }) => this.translocoLocalizeRouter.changeLanguage(lang))
      ),
    { dispatch: false }
  );

  trackGAPageView$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.newSeoConfig),
        map(({ config }) => this.googleAnalytics.sendPageView({ url: config.route, title: config.title }))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private translocoLocalizeRouter: TranslocoLocalizeRouterService,
    private googleAnalytics: GoogleAnalyticsService
  ) {}
}
