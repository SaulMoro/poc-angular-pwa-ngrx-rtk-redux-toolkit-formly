import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private title: Title, private translateService: TranslocoService) {}

  setTitle(title: string | string[], lang?: string): Observable<void> {
    return this.translateService.selectTranslate(title, {}, lang).pipe(
      map(Object.values),
      take(1),
      map((translatedTitles) =>
        this.title.setTitle(translatedTitles.reduce((total, curr) => `${total}${total ? ' - ' : ''}${curr}`, ''))
      )
    );
  }

  setDetailTitle(title: string[], lang?: string): Observable<void> {
    return this.translateService.selectTranslate(title[1], {}, lang).pipe(
      take(1),
      map((translatedTitle) => this.title.setTitle(`${title[0]} - ${translatedTitle}`))
    );
  }
}
