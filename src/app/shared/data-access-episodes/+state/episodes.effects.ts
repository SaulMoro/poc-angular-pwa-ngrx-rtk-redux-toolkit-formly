import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of } from 'rxjs';
import { map, debounceTime, switchMap, filter, catchError, mergeMap, tap } from 'rxjs/operators';

import { ofRouteEnter, ofRoutePageChange } from '@app/core/data-access-router';
import { ofFilterForm } from '@app/core/ngrx-form';
import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { FORM_EPISODES_FILTER_ID } from '@app/shared/models';
import { fromStore } from '@app/shared/utils';
import * as EpisodesActions from './episodes.actions';
import * as EpisodesApiActions from './episodes-api.actions';
import * as EpisodesSelectors from './episodes.selectors';
import { EpisodesService } from '../services/episodes.service';
import { fromEpisodeResponsesToEpisodes, fromEpisodeResponseToEpisode } from '../models/episode-response.model';

@Injectable()
export class EpisodesEffects {
  enterEpisodesPage$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteEnter('/episodes'),
      map(() => EpisodesActions.enterEpisodesPage())
    )
  );

  pageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofRoutePageChange('/episodes'),
      map((page) => EpisodesActions.pageChange({ page }))
    )
  );

  enterEpisodeDetailsOnNav$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteEnter('/episodes/:id'),
      map(({ params }) => params?.id),
      map((episodeId: number) => EpisodesActions.enterEpisodeDetailsPage({ episodeId }))
    )
  );

  filterEpisodes$ = createEffect(() => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofFilterForm(FORM_EPISODES_FILTER_ID),
      debounceTime(debounce, scheduler),
      switchMap(() =>
        // Reset Filter Page
        this.router.navigate([], {
          queryParams: { page: null },
          queryParamsHandling: 'merge',
        })
      ),
      map(() => EpisodesActions.filterEpisodes())
    )
  );

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActions.enterEpisodesPage, EpisodesActions.pageChange, EpisodesActions.filterEpisodes),
      fromStore(EpisodesSelectors.getCurrentFilter, EpisodesSelectors.getCurrentPage)(this.store),
      tap(([, currentFilter, page]) =>
        this.googleAnalytics.sendEvent({
          name: 'New Episodes Filter',
          category: GAEventCategory.FILTER,
          label: JSON.stringify(currentFilter),
          value: page,
        })
      ),
      switchMap(([, currentFilter, page]) =>
        this.episodesService.getEpisodes(currentFilter, page).pipe(
          map(({ info, results }) =>
            EpisodesApiActions.loadEpisodesSuccess({
              episodes: fromEpisodeResponsesToEpisodes(results).map((episode) => ({
                ...episode,
                page,
              })),
              count: info?.count,
              pages: info?.pages,
              page,
            })
          ),
          catchError((error) => of(EpisodesApiActions.loadEpisodesFailure({ error })))
        )
      )
    )
  );

  prefetchNextPageOfEpisodes$ = createEffect(() =>
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
              count: info?.count,
              pages: info?.pages,
              page: action.page + 1,
            })
          ),
          catchError((error) => of(EpisodesApiActions.prefetchNextEpisodesPageFailure({ error })))
        )
      )
    )
  );

  loadEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActions.enterEpisodeDetailsPage),
      switchMap(({ episodeId }) =>
        this.episodesService.getEpisode(episodeId).pipe(
          map((episode) =>
            EpisodesApiActions.loadEpisodeSuccess({
              episode: fromEpisodeResponseToEpisode(episode),
            })
          ),
          catchError((error) => of(EpisodesApiActions.loadEpisodeFailure({ error })))
        )
      )
    )
  );

  loadEpisodesFromIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActions.requiredCharactersEpisodes),
      mergeMap(({ episodeIds }) =>
        this.episodesService.getEpisodesFromIds(episodeIds).pipe(
          map((episodes) =>
            EpisodesApiActions.loadEpisodesFromIdsSuccess({
              episodes: fromEpisodeResponsesToEpisodes(episodes),
            })
          ),
          catchError((error) => of(EpisodesApiActions.loadEpisodesFromIdsFailure({ error })))
        )
      )
    )
  );

  /* showErrorLoadDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EpisodesApiActions.loadEpisodesFailure,
        EpisodesApiActions.loadEpisodeFailure,
        EpisodesApiActions.loadEpisodesFromIdsFailure
      ),
      exhaustMap(({ error }) =>
        this.dialog
          .open(AlertDialogComponent, {
            data: [!!error.errorMessage ? error.errorMessage : translate('ERRORS.BACKEND'), translate('ERRORS.RETRY')],
          })
          .afterClosed()
      )
    )
  ); */

  constructor(
    private actions$: Actions,
    private store: Store,
    private episodesService: EpisodesService,
    private router: Router,
    private googleAnalytics: GoogleAnalyticsService
  ) {}
}
