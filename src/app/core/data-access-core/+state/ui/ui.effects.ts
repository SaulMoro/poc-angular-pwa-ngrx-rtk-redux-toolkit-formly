import { Injectable } from '@angular/core';
import { translate } from '@ngneat/transloco';
import { TranslocoLocalizeRouterService } from '@saulmoro/transloco-localize-router/index';
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
  changeLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.changeLanguage),
        map(({ lang }) => this.translocoLocalizeRouter.changeLanguage(lang))
      ),
    { dispatch: false }
  );

  setAppTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.newNavigationData, UiActions.changeLanguage),
        withLatestFrom(this.store.pipe(select(UiSelectors.getTitle))),
        switchMap(([action, title]: any[]) => this.titleService.setTitle(title, action.lang))
      ),
    { dispatch: false }
  );

  setAppDetailTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.newDetailPageTitle),
        withLatestFrom(this.store.pipe(select(UiSelectors.getTitle))),
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
    private translocoLocalizeRouter: TranslocoLocalizeRouterService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
}
