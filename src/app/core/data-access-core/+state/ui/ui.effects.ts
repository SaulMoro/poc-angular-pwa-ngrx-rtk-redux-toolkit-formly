import { Injectable } from '@angular/core';
import { translate } from '@ngneat/transloco';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as UiActions from './ui.actions';
import * as UiSelectors from './ui.selectors';
import * as CoreActions from '../core.actions';
import { TitleService } from '../../services/title.service';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';

@Injectable()
export class UiEffects {
  setAppTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.newNavigationData),
        withLatestFrom(this.store.pipe(select(UiSelectors.getTitle))),
        // tslint:disable-next-line: rxjs-no-unsafe-switchmap
        switchMap(([, title]) => this.titleService.setTitle(title))
      ),
    { dispatch: false }
  );

  setAppDetailTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.newDetailPageTitle),
        withLatestFrom(this.store.pipe(select(UiSelectors.getTitle))),
        // tslint:disable-next-line: rxjs-no-unsafe-switchmap
        switchMap(([, title]) => this.titleService.setDetailTitle(title))
      ),
    { dispatch: false }
  );

  showErrorDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.showErrorDialog),
        map(({ message }) =>
          this.dialog.open(AlertDialogComponent, {
            data: [!!message ? message : translate('ERRORS.BACKEND'), translate('ERRORS.RETRY')],
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
          this.snackBar.open(!!message ? message : translate('ERRORS.OK'), translate('BUTTONS.CLOSE_DEFAULT'), {
            panelClass: 'mat-snackbar',
            duration: 3000,
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private titleService: TitleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
}
