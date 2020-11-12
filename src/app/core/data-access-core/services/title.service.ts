import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private title: Title, private translateService: TranslocoService) {}

  setTitle(title: string | string[]): Observable<any> {
    return this.translateService.selectTranslate(title).pipe(
      map(Object.values),
      tap((translatedTitles) =>
        this.title.setTitle(translatedTitles.reduce((total, curr) => `${total}${total ? ' - ' : ''}${curr}`, ''))
      )
    );
  }

  setDetailTitle(title: string[]): Observable<any> {
    return this.translateService
      .selectTranslate(title[1])
      .pipe(tap((translatedTitle) => this.title.setTitle(`${title[0]} - ${translatedTitle}`)));
  }
}
