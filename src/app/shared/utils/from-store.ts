import { MemoizedSelector, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { withLatestFrom, concatMap } from 'rxjs/operators';

export function fromStore<T1>(
  s1: MemoizedSelector<any, T1>
): (store: Store) => <A>(source$: Observable<A>) => Observable<[A, T1]>;
export function fromStore<T1, T2>(
  s1: MemoizedSelector<any, T1>,
  s2: MemoizedSelector<any, T2>
): (store: Store) => <A>(source$: Observable<A>) => Observable<[A, T1, T2]>;
export function fromStore<T1, T2, T3>(
  s1: MemoizedSelector<any, T1>,
  s2: MemoizedSelector<any, T2>,
  s3: MemoizedSelector<any, T3>
): (store: Store) => <A>(source$: Observable<A>) => Observable<[A, T1, T2, T3]>;
export function fromStore<T1, T2, T3, T4>(
  s1: MemoizedSelector<any, T1>,
  s2: MemoizedSelector<any, T2>,
  s3: MemoizedSelector<any, T3>,
  s4: MemoizedSelector<any, T4>
): (store: Store) => <A>(source$: Observable<A>) => Observable<[A, T1, T2, T3, T4]>;
export function fromStore<T1, T2, T3, T4, T5>(
  s1: MemoizedSelector<any, T1>,
  s2: MemoizedSelector<any, T2>,
  s3: MemoizedSelector<any, T3>,
  s4: MemoizedSelector<any, T4>,
  s5: MemoizedSelector<any, T5>
): (store: Store) => <A>(source$: Observable<A>) => Observable<[A, T1, T2, T3, T4, T5]>;
export function fromStore(
  ...selectors: MemoizedSelector<any, any>[]
): (
  store: Store
) => <A>(
  source$: Observable<A>
) => Observable<
  [A, any] | [A, any, any] | [A, any, any, any] | [A, any, any, any, any] | [A, any, any, any, any, any]
> {
  return (store: Store) => <A>(source$: Observable<A>) =>
    source$.pipe(
      concatMap((source) =>
        of(source).pipe(withLatestFrom<A, any>(...selectors.map((selector) => store.pipe(select(selector)))))
      )
    );
}
