import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { map, switchMap, catchError, filter, mergeMap } from 'rxjs/operators';

import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { SeoService } from '@app/core/seo';
import { LocationsActions } from '@app/shared/data-access-locations';
import { EpisodesActions } from '@app/shared/data-access-episodes';
import { Episode, Location } from '@app/shared/models';
import { CharactersActions } from './characters.slice';
import * as CharactersSelectors from './characters.selectors';
import { CharactersService } from '../services/characters.service';
import {
  fromCharacterResponsesToCharacters,
  fromCharacterResponseToCharacter,
} from '../models/character-response.model';

@Injectable()
export class CharactersEffects {
  loadCharactersStart$ = createEffect(() =>
    merge(
      this.actions$.pipe(
        ofType(CharactersActions.newCharactersFilter),
        concatLatestFrom(() => this.store.select(CharactersSelectors.getCurrentPage)),
        map(([{ payload: filter }, currentPage]) => ({ filter, page: currentPage ?? 1 })),
      ),
      this.actions$.pipe(
        ofType(CharactersActions.filterPageChange),
        concatLatestFrom(() => [
          this.store.select(CharactersSelectors.getLoadedPages),
          this.store.select(CharactersSelectors.getCurrentFilter),
        ]),
        filter(([{ payload: page }, loadedPages]) => !loadedPages.includes(page)),
        map(([{ payload: page }, , filter]) => ({ filter, page })),
      ),
    ).pipe(map(CharactersActions.loadCharactersStart)),
  );

  resetFilter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CharactersActions.resetFilter),
        map(() => this.router.navigate([], { queryParams: {} })),
      ),
    { dispatch: false },
  );

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharactersStart),
      switchMap(({ payload: { filter, page } }) =>
        this.charactersService.getCharacters(filter, page).pipe(
          map(({ info, results }) =>
            CharactersActions.loadCharactersSuccess({
              data: fromCharacterResponsesToCharacters(results).map((character) => ({
                ...character,
                page,
              })),
              pages: info?.pages || page,
              page,
            }),
          ),
          catchError((error: unknown) => of(CharactersActions.loadCharactersFailure(error))),
        ),
      ),
    ),
  );

  loadCharacterDetailsStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.enterCharacterDetailsPage),
      concatLatestFrom(() => this.store.select(CharactersSelectors.getSelectedId)),
      map(([, characterId]) => CharactersActions.loadCharacterDetailsStart(characterId)),
    ),
  );

  loadCharacterDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharacterDetailsStart),
      switchMap(({ payload: characterId }) =>
        this.charactersService.getCharacter(characterId).pipe(
          map((character) =>
            CharactersActions.loadCharacterDetailsSuccess(fromCharacterResponseToCharacter(character)),
          ),
          catchError((error: unknown) => of(CharactersActions.loadCharacterDetailsFailure(error))),
        ),
      ),
    ),
  );

  requiredEpisodesOfCharacters$ = createEffect(() =>
    merge(
      this.actions$.pipe(
        ofType(CharactersActions.loadCharactersSuccess),
        map(({ payload: { data } }) => [...new Set(data.map((character) => character.firstEpisode?.id))]),
      ),
      this.actions$.pipe(
        ofType(CharactersActions.loadCharacterDetailsSuccess),
        map(({ payload: character }) => character.episodes),
      ),
    ).pipe(map(EpisodesActions.requiredEpisodesOfCharacters)),
  );

  loadCharactersFromIdsStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LocationsActions.loadLocationDetailsSuccess,
        EpisodesActions.loadEpisodeDetailsSuccess,
        LocationsActions.openCharactersDialog,
        EpisodesActions.openCharactersDialog,
      ),
      map(({ payload }): number[] => (payload as Location)?.residents ?? (payload as Episode)?.characters),
      concatLatestFrom(() => this.store.select(CharactersSelectors.getCharactersIds)),
      map(([characterIds, idsInState]) => characterIds?.filter((characterId) => !idsInState.includes(characterId))),
      filter((idsToFetch) => !!idsToFetch?.length),
      map((characterIds) => CharactersActions.loadCharactersFromIdsStart(characterIds)),
    ),
  );

  loadCharactersFromIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharactersFromIdsStart),
      mergeMap(({ payload: characterIds }) =>
        this.charactersService.getCharactersFromIds(characterIds).pipe(
          map((characters) =>
            CharactersActions.loadCharactersFromIdsSuccess(fromCharacterResponsesToCharacters(characters)),
          ),
          catchError((error: unknown) => of(CharactersActions.loadCharactersFromIdsFailure(error))),
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
        ofType(CharactersActions.loadCharactersStart),
        map(({ payload: { filter, page } }) =>
          this.googleAnalytics.sendEvent({
            name: 'New Characters Filter',
            category: GAEventCategory.FILTER,
            label: JSON.stringify({ filter, page }),
          }),
        ),
      ),
    { dispatch: false },
  );

  charactersPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CharactersActions.enterCharactersPage),
        concatLatestFrom(() => this.translocoService.selectTranslateObject('CHARACTERS.SEO')),
        map(([, config]) => this.seoService.generateMetaTags({ ...config, route: this.router.url })),
      ),
    { dispatch: false },
  );

  charactersDetailsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CharactersActions.loadCharacterDetailsSuccess),
        map(({ payload: character }) => character.name),
        concatLatestFrom((name) =>
          this.translocoService.selectTranslateObject('CHARACTERS.SEO_DETAILS', {
            title: { name },
            description: { name },
            'keywords.0': { name },
            'keywords.1': { name },
          }),
        ),
        map(([, config]) => this.seoService.generateMetaTags({ ...config, route: this.router.url })),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private charactersService: CharactersService,
    private store: Store,
    private router: Router,
    private translocoService: TranslocoService,
    private googleAnalytics: GoogleAnalyticsService,
    private seoService: SeoService,
  ) {}
}
