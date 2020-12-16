import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, filter, catchError, mergeMap, tap } from 'rxjs/operators';

import { ofRouteFilter, ofRoutePageChange } from '@app/core/data-access-router';
import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { fromStore } from '@app/shared/utils';
import * as EpisodesActions from './episodes.actions';
import * as EpisodesApiActions from './episodes-api.actions';
import * as EpisodesSelectors from './episodes.selectors';
import { EpisodesService } from '../services/episodes.service';
import { fromEpisodeResponsesToEpisodes, fromEpisodeResponseToEpisode } from '../models/episode-response.model';

@Injectable()
export class EpisodesEffects {
  filterEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteFilter('/episodes'),
      map(({ queryParams, page }) => EpisodesActions.filterEpisodes({ filter: queryParams, page: page || 1 }))
    )
  );

  filterPageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofRoutePageChange('/episodes'),
      map(({ queryParams, page }) => EpisodesActions.filterPageChange({ filter: queryParams, page }))
    )
  );

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(ofType(EpisodesActions.filterEpisodes, EpisodesActions.filterPageChange)).pipe(
      tap(({ filter: currentFilter, page }) =>
        this.googleAnalytics.sendEvent({
          name: 'New Episodes Filter',
          category: GAEventCategory.FILTER,
          label: JSON.stringify({ currentFilter, page }),
        })
      ),
      switchMap(({ filter: currentFilter, page }) =>
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
      fromStore(EpisodesSelectors.getSelectedId)(this.store),
      switchMap(([, episodeId]) =>
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
    private googleAnalytics: GoogleAnalyticsService
  ) {}
}
