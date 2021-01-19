import { OperatorFunction, pipe, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function handleNotResultsError<T>(emptyResult: T): OperatorFunction<any, T> {
  return pipe(
    catchError((error: unknown) => {
      if (error.status === 404) {
        return of(emptyResult);
      } else {
        return throwError(error);
      }
    }),
  );
}
