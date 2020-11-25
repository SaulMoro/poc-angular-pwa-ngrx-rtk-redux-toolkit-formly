import { Injectable } from '@angular/core';
import { TranslocoLocalizeRouterService } from '@saulmoro/transloco-localize-router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs/operators';

import { SeoService } from '@app/core/seo';
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
      this.seoService.seoChanges$.pipe(
        filter(({ title }) => !!title),
        map(({ route: url, title }) => this.googleAnalytics.sendPageView({ url, title }))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private translocoLocalizeRouter: TranslocoLocalizeRouterService,
    private seoService: SeoService,
    private googleAnalytics: GoogleAnalyticsService
  ) {}
}
