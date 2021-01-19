import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap, concatMap, withLatestFrom, filter } from 'rxjs/operators';

import { matchRouteEnter, matchRouteFilter, matchRoutePageChange, ofRoute } from '@app/core/data-access-router';
import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { SeoService } from '@app/core/seo';
import { fromStore } from '@app/shared/utils';
import { EpisodesActions } from './episodes.slice';
import * as EpisodesSelectors from './episodes.selectors';
import { EpisodesService } from '../services/episodes.service';
import { fromEpisodeResponsesToEpisodes, fromEpisodeResponseToEpisode } from '../models/episode-response.model';

@Injectable()
export class EpisodesEffects {
  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofRoute('/episodes', matchRouteEnter, matchRouteFilter, matchRoutePageChange),
      map(({ queryParams: currentFilter, page }) => ({ currentFilter, page: page ?? 1 })),
      fromStore(EpisodesSelectors.getLoadedPages)(this.store),
      filter(([{ page }, loadedPages]) => !loadedPages.includes(page)),
      switchMap(([{ currentFilter, page }]) =>
        this.episodesService.getEpisodes(currentFilter, page).pipe(
          map(({ info, results }) =>
            EpisodesActions.loadListSuccess({
              data: fromEpisodeResponsesToEpisodes(results).map((episode) => ({
                ...episode,
                page,
              })),
              pages: info?.pages || page,
              page,
            })
          ),
          catchError((error) => of(EpisodesActions.loadListFailure(error)))
        )
      )
    )
  );

  /* prefetchNextPageOfEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesApiActions.loadEpisodesSuccess),
      fromStore(EpisodesSelectors.getCurrentFilter, EpisodesSelectors.getLoadedPages)(this.store),
      filter(([action, , loadedPages]) => action.page < action.pages && !loadedPages.includes(action.page + 1)),
      mergeMap(([action, currentFilter]) =>
        this.episodesService.getEpisodes(currentFilter, action.page + 1).pipe(
          map(({ info, results }) =>
            EpisodesApiActions.prefetchNextEpisodesPageSuccess({
              episodes: fromEpisodeResponsesToEpisodes(results).map((episode) => ({
                ...episode,
                page: action.page + 1,
              })),
              count: info?.count || results.length,
              pages: info?.pages || action.page + 1,
              page: action.page + 1,
            })
          ),
          catchError((error) => of(EpisodesApiActions.prefetchNextEpisodesPageFailure({ error })))
        )
      )
    )
  ); */

  loadEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofRoute('/episodes/:id', matchRouteEnter),
      switchMap(({ params: { id } }) =>
        this.episodesService.getEpisode(id).pipe(
          map((episode) => EpisodesActions.loadDetailsSuccess(fromEpisodeResponseToEpisode(episode))),
          catchError((error) => of(EpisodesActions.loadDetailsFailure(error)))
        )
      )
    )
  );

  loadEpisodesFromIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActions.requiredCharactersEpisodes),
      mergeMap(({ payload: episodeIds }) =>
        this.episodesService.getEpisodesFromIds(episodeIds).pipe(
          map((episodes) => EpisodesActions.loadFromIdsSuccess(fromEpisodeResponsesToEpisodes(episodes))),
          catchError((error) => of(EpisodesActions.loadFromIdsFailure(error)))
        )
      )
    )
  );

  /*
   * Analytics and SEO
   */

  gaTrackOnNewFilter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofRoute('/episodes', matchRouteEnter, matchRouteFilter),
        tap(({ queryParams: currentFilter }) =>
          this.googleAnalytics.sendEvent({
            name: 'New Episodes Filter',
            category: GAEventCategory.FILTER,
            label: JSON.stringify(currentFilter),
          })
        )
      ),
    { dispatch: false }
  );

  gaTrackOnOpenCharactersDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EpisodesActions.openCharactersDialog),
        tap(({ payload: episode }) =>
          this.googleAnalytics.sendEvent({
            name: 'Open Characters Dialog Of Episode',
            category: GAEventCategory.INTERACTION,
            label: episode.name,
            value: episode.id,
          })
        )
      ),
    { dispatch: false }
  );

  episodesPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofRoute('/episodes', matchRouteEnter),
        concatMap(({ route }) =>
          of(route).pipe(withLatestFrom(this.translocoService.selectTranslateObject('EPISODES.SEO')))
        ),
        tap(([route, config]) => this.seoService.generateMetaTags({ ...config, route }))
      ),
    { dispatch: false }
  );

  episodesDetailsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EpisodesActions.loadDetailsSuccess),
        map(({ payload: episode }) => episode.name),
        concatMap((name) =>
          of(this.router.url).pipe(
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
        tap(([route, config]) => this.seoService.generateMetaTags({ ...config, route }))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private episodesService: EpisodesService,
    private store: Store,
    private router: Router,
    private translocoService: TranslocoService,
    private googleAnalytics: GoogleAnalyticsService,
    private seoService: SeoService
  ) {}
}
