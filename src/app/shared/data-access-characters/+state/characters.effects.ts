import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, merge, of } from 'rxjs';
import { map, debounceTime, switchMap, filter, catchError, mergeMap, tap } from 'rxjs/operators';

import { ofRoutePageChange } from '@app/core/data-access-router';
import { ofFilterForm } from '@app/core/dynamic-form';
import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { LocationsActions, LocationsApiActions } from '@app/shared/data-access-locations';
import { EpisodesActions, EpisodesApiActions, EpisodesSelectors } from '@app/shared/data-access-episodes';
import { FORM_CHARACTERS_FILTER_ID } from '@app/shared/models';
import { fromStore } from '@app/shared/utils';
import * as CharactersActions from './characters.actions';
import * as CharactersApiActions from './characters-api.actions';
import * as CharactersSelectors from './characters.selectors';
import { CharactersService } from '../services/characters.service';
import {
  fromCharacterResponsesToCharacters,
  fromCharacterResponseToCharacter,
} from '../models/character-response.model';

@Injectable()
export class CharactersEffects {
  filterPageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofRoutePageChange('/characters'),
      map((page) => CharactersActions.filterPageChange({ page }))
    )
  );

  filterCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofFilterForm(FORM_CHARACTERS_FILTER_ID),
      map((model) => CharactersActions.filterCharacters({ filter: model }))
    )
  );

  loadCharacters$ = createEffect(() =>
    merge(
      this.actions$.pipe(
        ofType(CharactersActions.enterCharactersPage, CharactersActions.filterPageChange),
        fromStore(CharactersSelectors.getCurrentFilter, CharactersSelectors.getCurrentPage)(this.store),
        map(([, currentFilter, page]) => ({ currentFilter, page }))
      ),
      this.actions$.pipe(
        ofType(CharactersActions.filterCharacters),
        map(({ filter: currentFilter }) => ({ currentFilter, page: 1 }))
      )
    ).pipe(
      tap(({ currentFilter, page }) =>
        this.googleAnalytics.sendEvent({
          name: 'New Characters Filter',
          category: GAEventCategory.FILTER,
          label: JSON.stringify({ currentFilter, page }),
        })
      ),
      switchMap(({ currentFilter, page }) =>
        this.charactersService.getCharacters(currentFilter, page).pipe(
          map(({ info, results }) =>
            CharactersApiActions.loadCharactersSuccess({
              characters: fromCharacterResponsesToCharacters(results).map((character) => ({
                ...character,
                page,
              })),
              count: info?.count,
              pages: info?.pages,
              page,
            })
          ),
          catchError((error) => of(CharactersApiActions.loadCharactersFailure({ error })))
        )
      )
    )
  );

  prefetchNextPageOfCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersApiActions.loadCharactersSuccess),
      fromStore(CharactersSelectors.getCurrentFilter, CharactersSelectors.getLoadedPages)(this.store),
      filter(([action, , loadedPages]) => action.page < action.pages && !loadedPages.includes(action.page + 1)),
      mergeMap(([action, currentFilter]) =>
        this.charactersService.getCharacters(currentFilter, action.page + 1).pipe(
          map(({ info, results }) =>
            CharactersApiActions.prefetchNextCharactersPageSuccess({
              characters: fromCharacterResponsesToCharacters(results).map((character) => ({
                ...character,
                page: action.page + 1,
              })),
              count: info?.count,
              pages: info?.pages,
              page: action.page + 1,
            })
          ),
          catchError((error) => of(CharactersApiActions.prefetchNextCharactersPageFailure({ error })))
        )
      )
    )
  );

  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.enterCharacterDetailsPage),
      fromStore(CharactersSelectors.getSelectedId)(this.store),
      switchMap(([, characterId]) =>
        this.charactersService.getCharacter(characterId).pipe(
          map((character) =>
            CharactersApiActions.loadCharacterSuccess({
              character: fromCharacterResponseToCharacter(character),
            })
          ),
          catchError((error) => of(CharactersApiActions.loadCharacterFailure({ error })))
        )
      )
    )
  );

  loadCharactersFromIds$ = createEffect(({ debounce = 500, scheduler = asyncScheduler } = {}) => () =>
    this.actions$.pipe(
      ofType(
        LocationsActions.hoverLocationLine,
        LocationsApiActions.loadLocationSuccess,
        EpisodesActions.hoverEpisodeLine,
        EpisodesApiActions.loadEpisodeSuccess
      ),
      debounceTime(debounce, scheduler),
      map((action: any) => action.location?.residents ?? action.episode?.characters),
      fromStore(CharactersSelectors.getCharactersIds)(this.store),
      map(([characterIds, ids]) => characterIds?.filter((characterId) => !ids.includes(characterId))),
      filter((idsToFetch) => !!idsToFetch?.length),
      switchMap((idsToFetch) =>
        this.charactersService.getCharactersFromIds(idsToFetch).pipe(
          map((characters) =>
            CharactersApiActions.loadCharactersFromIdsSuccess({
              characters: fromCharacterResponsesToCharacters(characters),
            })
          ),
          catchError((error) => of(CharactersApiActions.loadCharactersFromIdsFailure({ error })))
        )
      )
    )
  );

  requiredCharactersEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CharactersApiActions.loadCharactersSuccess,
        CharactersApiActions.prefetchNextCharactersPageSuccess,
        CharactersApiActions.loadCharacterSuccess
      ),
      map((action: any) =>
        action.characters
          ? [...new Set(action.characters.map((character) => character.firstEpisode?.id))]
          : action.character.episodes
      ),
      fromStore(EpisodesSelectors.getEpisodesIds)(this.store),
      map(([episodeIds, ids]) => episodeIds?.filter((episodeId) => !ids.includes(episodeId))),
      filter((episodeIds) => !!episodeIds?.length),
      map((episodeIds) => EpisodesActions.requiredCharactersEpisodes({ episodeIds }))
    )
  );

  /* showErrorLoadDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CharactersApiActions.loadCharactersFailure,
        CharactersApiActions.loadCharacterFailure,
        CharactersApiActions.loadCharactersFromIdsFailure
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
    private charactersService: CharactersService,
    private router: Router,
    private googleAnalytics: GoogleAnalyticsService
  ) {}
}
