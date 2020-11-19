import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

const APP_TITLE = 'APP_TITLE';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private title: Title, private translateService: TranslocoService) {}

  setTitle(title: string, lang?: string): Observable<string> {
    return this.translateService.selectTranslate([title, APP_TITLE], {}, lang).pipe(
      map(Object.values),
      take(1),
      map((translatedTitles) => translatedTitles.reduce((total, curr) => `${total}${total ? ' - ' : ''}${curr}`, '')),
      tap((translatedTitle) => this.title.setTitle(translatedTitle))
    );
  }

  setDetailsTitle(title: string, lang?: string): Observable<string> {
    return this.translateService.selectTranslate(APP_TITLE, {}, lang).pipe(
      take(1),
      map((translatedTitle) => `${title} - ${translatedTitle}`),
      tap((translatedTitle) => this.title.setTitle(translatedTitle))
    );
  }

  getCurrentTitle(): string {
    return this.title.getTitle();
  }
}
