import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';

import { ofRouteLangChange } from '@app/core/data-access-router';
import { SeoService } from '@app/core/seo';
import { environment } from '@environments/environment';
import { GoogleAnalyticsService } from './google-analytics.service';
import { GAEventCategory } from './types';

@Injectable()
export class GoogleAnalyticsEffects {
  trackGAPageViewOnSeoChanges$ = createEffect(
    () =>
      this.seoService.seoChanges$.pipe(
        filter(({ title }) => !!title),
        map(({ route: url, title }) => this.googleAnalytics.sendPageView({ url, title }))
      ),
    { dispatch: false }
  );

  trackGAChangeLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofRouteLangChange(/.*/),
        map(({ params }) => params.lang ?? environment.defaultLanguage),
        map((lang) =>
          this.googleAnalytics.sendEvent({
            name: 'Changed Language',
            category: GAEventCategory.INTERACTION,
            label: lang,
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private googleAnalytics: GoogleAnalyticsService,
    private seoService: SeoService
  ) {}
}
