import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { concatMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { mapToRouterState, ofRouteEnter, RouterSelectors } from '@app/core/data-access-router';
import { TranslocoLocalizeRouterService } from '@app/core/transloco-localize-router';
import * as CoreActions from './core.actions';
import { GoogleAnalyticsService, TitleService } from '../services';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

@Injectable()
export class CoreEffects {
  changeLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.changeLanguage),
        map(({ lang }) => this.translocoLocalizeRouter.changeLanguage(lang))
      ),
    { dispatch: false }
  );

  setAppTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        mapToRouterState(),
        filter(({ data }) => data.title), // Skip details pages
        switchMap(({ data, params, url }) =>
          this.titleService
            .setTitle(data.title, params.lang)
            .pipe(map((translatedTitle) => this.googleAnalyticsService.sendPageView(url, translatedTitle)))
        )
      ),
    { dispatch: false }
  );

  setAppDetailsTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoreActions.enterCharacterDetailsPage,
          CoreActions.enterLocationDetailsPage,
          CoreActions.enterEpisodeDetailsPage
        ),
        switchMap(({ title }) =>
          this.titleService.setDetailsTitle(title).pipe(
            concatMap((translatedTitle) =>
              of(translatedTitle).pipe(withLatestFrom(this.store.pipe(select(RouterSelectors.getCurrentUrl))))
            ),
            map(([translatedTitle, url]) => this.googleAnalyticsService.sendPageView(url, translatedTitle))
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private googleAnalyticsService: GoogleAnalyticsService,
    private titleService: TitleService,
    private translocoLocalizeRouter: TranslocoLocalizeRouterService
  ) {}
}
