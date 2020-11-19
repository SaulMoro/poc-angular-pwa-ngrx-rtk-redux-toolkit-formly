import { select } from '@ngrx/store';
import { of } from 'rxjs';
import { withLatestFrom, concatMap } from 'rxjs/operators';

export const fromStore = (...selectors) => (store) => (source$) =>
  source$.pipe(
    concatMap((action) => of(action).pipe(withLatestFrom(...selectors.map((selector) => store.pipe(select(selector))))))
  );
