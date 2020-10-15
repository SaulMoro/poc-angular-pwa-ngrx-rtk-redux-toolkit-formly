import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // tslint:disable-next-line: variable-name
  private readonly _loading = new BehaviorSubject<boolean>(false);
  readonly loading$: Observable<boolean> = this._loading.asObservable().pipe(debounceTime(300));

  private activeRequests = 0;

  constructor() {}

  get loading(): boolean {
    return this._loading.getValue();
  }

  public start(): void {
    this.activeRequests++;
    this._setLoading();
  }

  public end(): void {
    this.activeRequests--;
    this._setLoading();
  }

  private _setLoading(): void {
    this._loading.next(this.activeRequests > 0);
  }
}
