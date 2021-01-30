import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom, filter, mergeMap } from 'rxjs/operators';

import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { SeoService } from '@app/core/seo';
import { fromStore } from '@app/shared/utils';
import { EpisodesActions } from './episodes.slice';
import * as EpisodesSelectors from './episodes.selectors';
import { EpisodesService } from '../services/episodes.service';
import { fromEpisodeResponsesToEpisodes, fromEpisodeResponseToEpisode } from '../models/episode-response.model';

@Injectable()
export class EpisodesEffects {
  loadEpisodesStart$ = createEffect(() =>
    merge(
      this.actions$.pipe(
        ofType(EpisodesActions.enterEpisodesPage),
        fromStore(EpisodesSelectors.getCurrentFilter, EpisodesSelectors.getCurrentPage)(this.store),
        map(([, filter, page]) => ({ filter, page })),
      ),
      this.actions$.pipe(
        ofType(EpisodesActions.newEpisodesFilter),
        map(({ payload: filter }) => ({ filter, page: 1 })),
      ),
      this.actions$.pipe(
        ofType(EpisodesActions.changeEpisodesFilterPage),
        fromStore(EpisodesSelectors.getLoadedPages, EpisodesSelectors.getCurrentFilter)(this.store),
        filter(([{ payload: page }, loadedPages]) => !loadedPages.includes(page)),
        map(([{ payload: page }, , filter]) => ({ filter, page })),
      ),
    ).pipe(map(EpisodesActions.loadEpisodesStart)),
  );

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActions.loadEpisodesStart),
      switchMap(({ payload: { filter, page } }) =>
        this.episodesService.getEpisodes(filter, page).pipe(
          map(({ info, results }) =>
            EpisodesActions.loadEpisodesSuccess({
              data: fromEpisodeResponsesToEpisodes(results).map((episode) => ({
                ...episode,
                page,
              })),
              pages: info?.pages || page,
              page,
            }),
          ),
          catchError((error: unknown) => of(EpisodesActions.loadEpisodesFailure(error))),
        ),
      ),
    ),
  );

  loadEpisodeDetailsStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActions.enterEpisodeDetailsPage),
      fromStore(EpisodesSelectors.getSelectedId)(this.store),
      map(([, episodeId]) => EpisodesActions.loadEpisodeDetailsStart(episodeId)),
    ),
  );

  loadEpisodeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActions.loadEpisodeDetailsStart),
      switchMap(({ payload: episodeId }) =>
        this.episodesService.getEpisode(episodeId).pipe(
          map((episode) => EpisodesActions.loadEpisodeDetailsSuccess(fromEpisodeResponseToEpisode(episode))),
          catchError((error: unknown) => of(EpisodesActions.loadEpisodeDetailsFailure(error))),
        ),
      ),
    ),
  );

  requiredEpisodesOfCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActions.requiredEpisodesOfCharacters),
      fromStore(EpisodesSelectors.getEpisodesIds)(this.store),
      map(([{ payload: episodeIds }, ids]) => episodeIds.filter((episodeId) => !ids.includes(episodeId))),
      filter((episodeIds) => !!episodeIds.length),
      map((episodeIds) => EpisodesActions.loadEpisodesFromIdsStart(episodeIds)),
    ),
  );

  loadEpisodesFromIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActions.loadEpisodesFromIdsStart),
      mergeMap(({ payload: episodeIds }) =>
        this.episodesService.getEpisodesFromIds(episodeIds).pipe(
          map((episodes) => EpisodesActions.loadEpisodesFromIdsSuccess(fromEpisodeResponsesToEpisodes(episodes))),
          catchError((error: unknown) => of(EpisodesActions.loadEpisodesFromIdsFailure(error))),
        ),
      ),
    ),
  );

  /*
   * Analytics and SEO
   */

  gaTrackOnNewFilter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EpisodesActions.loadEpisodesStart),
        map(({ payload: { filter, page } }) =>
          this.googleAnalytics.sendEvent({
            name: 'New Episodes Filter',
            category: GAEventCategory.FILTER,
            label: JSON.stringify({ filter, page }),
          }),
        ),
      ),
    { dispatch: false },
  );

  gaTrackOnOpenCharactersDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EpisodesActions.openCharactersDialog),
        map(({ payload: episode }) =>
          this.googleAnalytics.sendEvent({
            name: 'Open Characters Dialog Of Episode',
            category: GAEventCategory.INTERACTION,
            label: episode.name,
            value: episode.id,
          }),
        ),
      ),
    { dispatch: false },
  );

  episodesPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EpisodesActions.enterEpisodesPage),
        concatMap(() =>
          of(this.router.url).pipe(withLatestFrom(this.translocoService.selectTranslateObject('EPISODES.SEO'))),
        ),
        map(([route, config]) => this.seoService.generateMetaTags({ ...config, route })),
      ),
    { dispatch: false },
  );

  episodesDetailsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EpisodesActions.loadEpisodeDetailsSuccess),
        filter(() => this.router.url.includes('/episodes')),
        map(({ payload: episode }) => episode.name),
        concatMap((name) =>
          of(this.router.url).pipe(
            withLatestFrom(
              this.translocoService.selectTranslateObject('EPISODES.SEO_DETAILS', {
                title: { name },
                description: { name },
                'keywords.0': { name },
                'keywords.1': { name },
              }),
            ),
          ),
        ),
        map(([route, config]) => this.seoService.generateMetaTags({ ...config, route })),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private episodesService: EpisodesService,
    private store: Store,
    private router: Router,
    private translocoService: TranslocoService,
    private googleAnalytics: GoogleAnalyticsService,
    private seoService: SeoService,
  ) {}
}
