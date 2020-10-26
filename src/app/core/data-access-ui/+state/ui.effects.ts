import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

import { mapToData, mapToRouterState } from '@app/core/data-access-router';
import * as UiActions from './ui.actions';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';

@Injectable()
export class UiEffects {
  updateTitleOnNav$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      mapToRouterState(),
      mapToData<string>('title'),
      distinctUntilChanged(),
      map((title) => UiActions.setAppTitle({ title }))
    )
  );

  setAppTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.setAppTitle),
        map(({ title }) =>
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
        map(({ message }) =>
          this.dialog.open(AlertDialogComponent, {
            data: [
              !!message ? message : this.translate.instant('ERRORS.BACKEND'),
              this.translate.instant('ERRORS.RETRY'),
            ],
          })
        )
      ),
    { dispatch: false }
  );

  showSuccessSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.showSuccessSnackBar),
        map(({ message }) =>
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
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private title: Title
  ) {}
}
