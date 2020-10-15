import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Logger } from '@app/core/services';

const log = new Logger('HttpTimingInterceptor');

@Injectable()
export class HttpTimingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          log.debug(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      })
    );
  }
}
