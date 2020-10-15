import { select } from '@ngrx/store';
import { of } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';

export const fromStore = (...selectors) => (store) => (source$) =>
  source$.pipe(withLatestFrom(...selectors.map((selector) => store.pipe(select(selector)))));

export const getFromStore = (...selectors) => (store) =>
  of(null).pipe(
    withLatestFrom(...selectors.map((selector) => store.pipe(select(selector)))),
    map(([...results]) => results.slice(1))
  );
