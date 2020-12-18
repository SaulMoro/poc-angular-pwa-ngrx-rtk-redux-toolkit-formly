import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { withLatestFrom, concatMap } from 'rxjs/operators';

export const fromStore = (...selectors: any[]) => (store: Store) => (source$: Observable<any>) =>
  source$.pipe(
    concatMap((action) =>
      of(action).pipe(withLatestFrom<any, any>(...selectors.map((selector) => store.pipe(select(selector)))))
    )
  );
