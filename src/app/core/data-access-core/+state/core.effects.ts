import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { concatMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ofRouteEnter, ofRouteLangChange, RouterSelectors } from '@app/core/data-access-router';
import { TranslocoLocalizeRouterService } from '@app/core/transloco-localize-router';
import * as CoreActions from './core.actions';
import { GAEventCategory } from '../models';
import { GoogleAnalyticsService, TitleService } from '../services';

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

  setAppTitleAndGAPageView$ = createEffect(
    () =>
      merge(
        this.actions$.pipe(
          ofRouteEnter(/.*/),
          filter(({ data }) => data.title)
        ),
        this.actions$.pipe(ofRouteLangChange(/.*/))
      ).pipe(
        map(({ data, url }) => ({ title: data.title, url })),
        switchMap(({ title, url }) =>
          this.titleService
            .translateAndSetTitle(title)
            .pipe(map((translatedTitle) => this.googleAnalytics.sendPageView({ url, title: translatedTitle })))
        )
      ),
    { dispatch: false }
  );

  setAppDetailsTitleAndGAPageView$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoreActions.enterCharacterDetailsPage,
          CoreActions.enterLocationDetailsPage,
          CoreActions.enterEpisodeDetailsPage
        ),
        switchMap(({ title }) =>
          this.titleService.translateAndSetDetailsTitle(title).pipe(
            concatMap((action) =>
              of(action).pipe(withLatestFrom(this.store.pipe(select(RouterSelectors.getCurrentUrl))))
            ),
            map(([translatedTitle, url]) => this.googleAnalytics.sendPageView({ url, title: translatedTitle }))
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private titleService: TitleService,
    private translocoLocalizeRouter: TranslocoLocalizeRouterService,
    private googleAnalytics: GoogleAnalyticsService
  ) {}
}
