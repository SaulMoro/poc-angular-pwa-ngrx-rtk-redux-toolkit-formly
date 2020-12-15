import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as UiSActions from './ui.actions';
import { ThemeService } from '../services/theme.service';

@Injectable()
export class UiEffects {
  changeTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiSActions.changeTheme),
        tap(({ theme }) => this.themeService.setTheme(theme))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private themeService: ThemeService) {}
}
