import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, concatMap, withLatestFrom, map } from 'rxjs/operators';

import { SeoService } from '@app/core/seo';
import * as LocationsActions from './locations.actions';
import * as LocationsApiActions from './locations-api.actions';

@Injectable()
export class LocationsSeoEffects {
  locationsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocationsActions.enterLocationsPage),
        concatMap((action) =>
          of(action).pipe(withLatestFrom(this.translocoService.selectTranslateObject('LOCATIONS.SEO')))
        ),
        tap(([, config]) => this.seoService.generateMetaTags({ ...config, route: this.router.url }))
      ),
    { dispatch: false }
  );

  locationsDetailsPageSEO$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocationsApiActions.loadLocationSuccess),
        map(({ location }) => location?.name),
        concatMap((name) =>
          of(name).pipe(
            withLatestFrom(
              this.translocoService.selectTranslateObject('LOCATIONS.SEO_DETAILS', {
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
