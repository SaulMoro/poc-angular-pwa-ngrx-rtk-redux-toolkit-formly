import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';

import { SeoService } from '@app/core/seo';
import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { ofRouteLangChange } from '@app/core/data-access-router';
import { environment } from '@environments/environment';

@Injectable()
export class CoreEffects {
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
    private seoService: SeoService,
    private googleAnalytics: GoogleAnalyticsService
  ) {}
}
