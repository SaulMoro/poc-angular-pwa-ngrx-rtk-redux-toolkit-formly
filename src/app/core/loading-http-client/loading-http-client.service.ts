import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, defer } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { LoadingService } from './services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingHttpClient {
  constructor(private http: HttpClient, private loading: LoadingService) {}

  get<T>(url: string, params: HttpParams = new HttpParams(), showLoading = false): Observable<T> {
    return this._request<T>(
      this.http.get<T>(`${environment.apiUrl}${url}`, { params }),
      showLoading
    );
  }

  post<T>(url: string, data: object = {}, showLoading = false, login: boolean = false): Observable<T> {
    return this._request<T>(
      this.http.post<T>(`${environment.apiUrl}${url}`, JSON.stringify(data), {
        withCredentials: login,
      }),
      showLoading
    );
  }

  put<T>(url: string, data: object = {}, showLoading = false): Observable<T> {
    return this._request<T>(this.http.put<T>(`${environment.apiUrl}${url}`, JSON.stringify(data)), showLoading);
  }

  delete<T>(url: string, showLoading = false): Observable<T> {
    return this._request<T>(this.http.delete<T>(`${environment.apiUrl}${url}`), showLoading);
  }

  private _request<T>(httpRequest$: Observable<any>, showLoading: boolean): Observable<T> {
    return showLoading
      ? defer(() => {
          this.loading.start();
          return httpRequest$.pipe(finalize(() => this.loading.end()));
        })
      : httpRequest$;
  }
}
