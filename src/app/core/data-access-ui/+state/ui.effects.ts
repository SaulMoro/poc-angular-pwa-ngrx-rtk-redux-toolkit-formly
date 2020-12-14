import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as UiSelectors from './ui.selectors';
import { ThemeService } from '../services/theme.service';

@Injectable()
export class UiEffects {
  loadUis$ = createEffect(
    () => this.store.select(UiSelectors.getTheme).pipe(tap((theme) => this.themeService.setTheme(theme))),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store, private themeService: ThemeService) {}
}
