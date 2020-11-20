import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

const APP_TITLE = 'APP_TITLE';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private title: Title, private translateService: TranslocoService) {}

  translateAndSetTitle(title?: string): Observable<string> {
    return title
      ? this._selectTranslate(title).pipe(tap((translatedTitle) => this.title.setTitle(translatedTitle)))
      : of(title);
  }

  translateAndSetDetailsTitle(title: string): Observable<string> {
    return this._selectTranslate().pipe(
      map((translatedTitle) => `${title} - ${translatedTitle}`),
      tap((translatedTitle) => this.title.setTitle(translatedTitle))
    );
  }

  private _selectTranslate(title?: string): Observable<string> {
    return this.translateService.selectTranslate(title ? [title, APP_TITLE] : [APP_TITLE]).pipe(
      map(Object.values),
      take(1),
      map((translatedTitles) => translatedTitles.reduce((total, curr) => `${total}${total ? ' - ' : ''}${curr}`, ''))
    );
  }
}
