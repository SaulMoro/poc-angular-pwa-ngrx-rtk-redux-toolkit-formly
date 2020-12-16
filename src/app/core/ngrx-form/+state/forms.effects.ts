import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { filter, map, concatMap, withLatestFrom } from 'rxjs/operators';

import { RouterSelectors } from '@app/core/data-access-router';
import * as FormsActions from './forms.actions';
import * as FormsSelectors from './forms.selectors';
import { fixDataForQueryParams, fixDataFromQueryParams } from './helpers';

@Injectable()
export class FormsEffects {
  initForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormsActions.enterFormConfig),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store$.pipe(select(FormsSelectors.selectForm, { formId: action.formId }))))
      ),
      filter(([, existsForm]) => !existsForm),
      concatMap(([action]) =>
        of(action).pipe(
          withLatestFrom(
            action.filter
              ? this.store$.pipe(select(RouterSelectors.getQueryParams), map(fixDataFromQueryParams))
              : of(action.model)
          )
        )
      ),
      map(([action, model]) => FormsActions.initForm({ ...action, model }))
    )
  );

  reuseForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormsActions.enterFormConfig),
      filter(({ reuse }) => reuse),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store$.pipe(select(FormsSelectors.selectForm, { formId: action.formId }))))
      ),
      filter(([, reuseForm]) => !!reuseForm),
      map(([action, { model }]) => FormsActions.reuseForm({ ...action, model }))
    )
  );

  updateQueryParamsOnFilter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FormsActions.reuseForm, FormsActions.updatedFormModel, FormsActions.submittedForm),
        filter(({ filter: formFilter }) => !!formFilter),
        map(({ model, type }) =>
          type === FormsActions.reuseForm.type
            ? { ...fixDataForQueryParams(model) }
            : // Reset pagination if update or submit filter form
              { ...fixDataForQueryParams(model), page: null }
        ),
        concatMap((queryParams) => this.router.navigate([], { queryParams, queryParamsHandling: 'merge' }))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store$: Store, private router: Router) {}
}
