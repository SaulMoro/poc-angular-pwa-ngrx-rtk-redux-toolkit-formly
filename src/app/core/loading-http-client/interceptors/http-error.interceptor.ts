import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Logger } from '@app/core/services';

const log = new Logger('HttpErrorInterceptor');

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error) => {
        log.error(`Request ${req.urlWithParams} error`, error);
        if (error.status === 401) {
          // refresh token
        } else {
          return throwError(error);
        }
      })
    );
  }
}
