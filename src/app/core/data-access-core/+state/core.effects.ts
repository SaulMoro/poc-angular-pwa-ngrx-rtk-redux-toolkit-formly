import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { concatMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ofRouteEnter, ofRouteLangChange, RouterSelectors } from '@app/core/data-access-router';
import { TranslocoLocalizeRouterService } from '@app/core/transloco-localize-router';
import * as CoreActions from './core.actions';
import { GoogleAnalyticsService, TitleService } from '../services';

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

  setAppTitle$ = createEffect(() =>
    merge(
      this.actions$.pipe(
        ofRouteEnter(/.*/),
        map(({ data }) => ({ title: data.title })),
        filter(Boolean)
      ),
      this.actions$.pipe(
        ofRouteLangChange(/.*/),
        map(({ data }) => ({ title: data.title }))
      ),
      this.actions$.pipe(
        ofType(
          CoreActions.enterCharacterDetailsPage,
          CoreActions.enterLocationDetailsPage,
          CoreActions.enterEpisodeDetailsPage
        )
      )
    ).pipe(
      switchMap(({ title }) =>
        this.titleService.setTitle(title).pipe(map((translatedTitle) => CoreActions.changedTitle({ translatedTitle })))
      )
    )
  );

  sendGAPageViewWithTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.changedTitle),
        concatMap((action) => of(action).pipe(withLatestFrom(this.store.pipe(select(RouterSelectors.getCurrentUrl))))),
        map(([{ translatedTitle }, url]) => this.googleAnalyticsService.sendPageView(url, translatedTitle))
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
