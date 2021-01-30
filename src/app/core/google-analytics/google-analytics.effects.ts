import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';

import { SeoService } from '@app/core/seo';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable()
export class GoogleAnalyticsEffects {
  trackGAPageViewOnSeoChanges$ = createEffect(
    () =>
      this.seoService.seoChanges$.pipe(
        filter(({ title }) => !!title),
        map(({ route: url = '/', title }) => this.googleAnalytics.sendPageView({ url, title })),
      ),
    { dispatch: false },
  );

  constructor(private googleAnalytics: GoogleAnalyticsService, private seoService: SeoService) {}
}
