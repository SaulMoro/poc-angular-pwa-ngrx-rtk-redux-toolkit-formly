import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, filter, catchError, mergeMap, tap } from 'rxjs/operators';

import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { matchRouteEnter, matchRouteFilter, ofRoute, ofRoutePageChange } from '@app/core/data-access-router';
import { LocationsActions } from '@app/shared/data-access-locations';
import { EpisodesActions, EpisodesSelectors } from '@app/shared/data-access-episodes';
import { Character } from '@app/shared/models';
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
  filterCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofRoute('/characters', matchRouteEnter, matchRouteFilter),
      map(({ queryParams, page }) => CharactersActions.filterCharacters({ filter: queryParams, page: page || 1 })),
    ),
  );

  filterPageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofRoutePageChange('/characters'),
      map(({ queryParams, page }) => CharactersActions.filterPageChange({ filter: queryParams, page: page || 1 })),
    ),
  );

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(ofType(CharactersActions.filterCharacters, CharactersActions.filterPageChange)).pipe(
      tap(({ filter: currentFilter, page }) =>
        this.googleAnalytics.sendEvent({
          name: 'New Characters Filter',
          category: GAEventCategory.FILTER,
          label: JSON.stringify({ currentFilter, page }),
        }),
      ),
      switchMap(({ filter: currentFilter, page }) =>
        this.charactersService.getCharacters(currentFilter, page).pipe(
          map(({ info, results }) =>
            CharactersApiActions.loadCharactersSuccess({
              characters: fromCharacterResponsesToCharacters(results).map((character) => ({
                ...character,
                page,
              })),
              count: info?.count || results.length,
              pages: info?.pages || page,
              page,
            }),
          ),
          catchError((error: unknown) => of(CharactersApiActions.loadCharactersFailure({ error }))),
        ),
      ),
    ),
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
              count: info?.count || results.length,
              pages: info?.pages || action.page + 1,
              page: action.page + 1,
            }),
          ),
          catchError((error: unknown) => of(CharactersApiActions.prefetchNextCharactersPageFailure({ error }))),
        ),
      ),
    ),
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
            }),
          ),
          catchError((error: unknown) => of(CharactersApiActions.loadCharacterFailure({ error }))),
        ),
      ),
    ),
  );

  loadCharactersFromIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LocationsActions.loadDetailsSuccess,
        EpisodesActions.loadDetailsSuccess,
        LocationsActions.openCharactersDialog,
        EpisodesActions.openCharactersDialog,
      ),
      map((action: any): number[] => action.location?.residents ?? action.episode?.characters),
      fromStore(CharactersSelectors.getCharactersIds)(this.store),
      map(([characterIds, ids]) => characterIds?.filter((characterId) => !ids.includes(characterId))),
      filter((idsToFetch) => !!idsToFetch?.length),
      switchMap((idsToFetch) =>
        this.charactersService.getCharactersFromIds(idsToFetch).pipe(
          map((characters) =>
            CharactersApiActions.loadCharactersFromIdsSuccess({
              characters: fromCharacterResponsesToCharacters(characters),
            }),
          ),
          catchError((error: unknown) => of(CharactersApiActions.loadCharactersFromIdsFailure({ error }))),
        ),
      ),
    ),
  );

  requiredCharactersEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CharactersApiActions.loadCharactersSuccess,
        CharactersApiActions.prefetchNextCharactersPageSuccess,
        CharactersApiActions.loadCharacterSuccess,
      ),
      map((action: any): number[] =>
        action.characters
          ? [...new Set(action.characters.map((character: Character) => character.firstEpisode?.id))]
          : action.character.episodes,
      ),
      fromStore(EpisodesSelectors.getEpisodesIds)(this.store),
      map(([episodeIds, ids]) => episodeIds?.filter((episodeId) => !ids.includes(episodeId))),
      filter((episodeIds) => !!episodeIds?.length),
      map((episodeIds) => EpisodesActions.requiredCharactersEpisodes(episodeIds)),
    ),
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
    private googleAnalytics: GoogleAnalyticsService,
  ) {}
}
