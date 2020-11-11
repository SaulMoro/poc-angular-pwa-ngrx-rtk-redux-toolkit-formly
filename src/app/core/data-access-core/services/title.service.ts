import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private translateService: TranslocoService, private title: Title) {}

  setTitle(title: string | string[], lazyTranslateService?: TranslocoService): Observable<any> {
    const translate = lazyTranslateService || this.translateService;
    return translate.selectTranslate(title).pipe(
      map(Object.values),
      tap((translatedTitles) =>
        this.title.setTitle(translatedTitles.reduce((total, curr) => `${total}${total ? ' - ' : ''}${curr}`, ''))
      )
    );
  }
}
