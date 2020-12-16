import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, concatMap, withLatestFrom, map } from 'rxjs/operators';

import { SeoService } from '@app/core/seo';
import * as CharactersActions from './characters.actions';
import * as CharactersApiActions from './characters-api.actions';

@Injectable()
export class CharactersSeoEffects {
  charactersPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CharactersActions.enterCharactersPage),
        concatMap((action) =>
          of(action).pipe(withLatestFrom(this.translocoService.selectTranslateObject('CHARACTERS.SEO')))
        ),
        tap(([, config]) => this.seoService.generateMetaTags({ ...config, route: this.router.url }))
      ),
    { dispatch: false }
  );

  charactersDetailsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CharactersApiActions.loadCharacterSuccess),
        map(({ character }) => character?.name),
        concatMap((name) =>
          of(name).pipe(
            withLatestFrom(
              this.translocoService.selectTranslateObject('CHARACTERS.SEO_DETAILS', {
                title: { name },
                description: { name },
                'keywords.0': { name },
                'keywords.1': { name },
              })
            )
          )
        ),
        tap(([, config]) => this.seoService.generateMetaTags({ ...config, route: this.router.url }))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private translocoService: TranslocoService,
    private seoService: SeoService
  ) {}
}
