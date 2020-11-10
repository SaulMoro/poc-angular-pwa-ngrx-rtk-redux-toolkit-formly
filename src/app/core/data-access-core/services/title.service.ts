import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private translateService: TranslateService, private title: Title) {}

  setTitle(title: string | string[], lazyTranslateService?: TranslateService): Observable<any> {
    const translate = lazyTranslateService || this.translateService;
    return translate.get(title).pipe(
      map(Object.values),
      tap((translatedTitles) =>
        this.title.setTitle(translatedTitles.reduce((total, curr) => `${total}${total ? ' - ' : ''}${curr}`, ''))
      )
    );
  }
}
