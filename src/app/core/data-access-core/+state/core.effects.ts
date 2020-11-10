import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';

import { ofRouteEnter } from '@app/core/data-access-router';
import * as CoreActions from './core.actions';

@Injectable()
export class CoreEffects {
  newNavigationDataOnNav$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteEnter(/.*/),
      filter(({ data }) => !!Object.values(data).length),
      map(({ data }) => CoreActions.newNavigationData({ data }))
    )
  );

  constructor(private actions$: Actions) {}
}
