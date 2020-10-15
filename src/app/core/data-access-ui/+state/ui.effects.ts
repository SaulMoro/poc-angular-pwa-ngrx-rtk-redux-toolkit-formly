import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { concatMap, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { DialogService } from '@app/core/dialog';
import { mapToData, mapToRouterState } from '@app/core/data-access-router';
import * as UiActions from './ui.actions';

@Injectable()
export class UiEffects {
  updateTitleOnNav$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      mapToRouterState(),
      mapToData<string>('title'),
      distinctUntilChanged(),
      map((title) => UiActions.updateTitle({ title }))
    )
  );

  updateTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.updateTitle),
        // tslint:disable-next-line: rxjs-no-unsafe-switchmap
        switchMap(({ title }) =>
          this.translate.get(['APP_TITLE', ...([title] ?? [])]).pipe(
            map(Object.values),
            tap((translatedTitles) =>
              translatedTitles.length > 1
                ? this.title.setTitle(`${translatedTitles[1]} - ${translatedTitles[0]}`)
                : this.title.setTitle(`${translatedTitles[0]}`)
            )
          )
        )
      ),
    { dispatch: false }
  );

  showErrorDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.showErrorDialog),
        concatMap(({ message }) =>
          this.dialog.openAlert({
            content: [
              !!message ? message : this.translate.instant('ERRORS.BACKEND'),
              this.translate.instant('ERRORS.RETRY'),
            ],
            acceptText: this.translate.instant('BUTTONS.ACCEPT_DEFAULT'),
          })
        )
      ),
    { dispatch: false }
  );

  showSuccessSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.showSuccessSnackBar),
        tap(({ message }) =>
          this.snackBar.open(
            !!message ? message : this.translate.instant('ERRORS.OK'),
            this.translate.instant('BUTTONS.CLOSE_DEFAULT'),
            {
              panelClass: 'mat-snackbar',
              duration: 3000,
            }
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private dialog: DialogService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private title: Title
  ) {}
}
