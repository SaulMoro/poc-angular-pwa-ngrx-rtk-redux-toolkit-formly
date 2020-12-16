import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, concatMap, withLatestFrom, map } from 'rxjs/operators';

import { SeoService } from '@app/core/seo';
import * as EpisodesActions from './episodes.actions';
import * as EpisodesApiActions from './episodes-api.actions';

@Injectable()
export class EpisodesSeoEffects {
  episodesPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EpisodesActions.enterEpisodesPage),
        concatMap((action) =>
          of(action).pipe(withLatestFrom(this.translocoService.selectTranslateObject('EPISODES.SEO')))
        ),
        tap(([, config]) => this.seoService.generateMetaTags({ ...config, route: this.router.url }))
      ),
    { dispatch: false }
  );

  episodesDetailsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EpisodesApiActions.loadEpisodeSuccess),
        map(({ episode }) => episode?.name),
        concatMap((name) =>
          of(name).pipe(
            withLatestFrom(
              this.translocoService.selectTranslateObject('EPISODES.SEO_DETAILS', {
                title: { name },
                description: { name },
                'keywords.0': { name },
                'keywords.1': { name },
              })
            )
          )
        ),
        tap(([, config]) => this.seoService.generateMetaTags({ ...config, route: this.router.url }))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private translocoService: TranslocoService,
    private seoService: SeoService
  ) {}
}
