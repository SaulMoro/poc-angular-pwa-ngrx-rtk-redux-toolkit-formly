import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreActions } from '@app/core/data-access-core';
import { MenuItem } from '@app/core/layout/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  supportedLanguages = this.translate.getAvailableLangs();
  language$ = this.translate.langChanges$;
  menu$: Observable<MenuItem[]> = this.translate
    .selectTranslate(['CHARACTERS.TITLE', 'LOCATIONS.TITLE', 'EPISODES.TITLE'])
    .pipe(
      map(([charactersTitle, locationsTitle, episodesTitle]) => [
        {
          name: charactersTitle,
          path: '/characters',
        },
        {
          name: locationsTitle,
          path: '/locations',
        },
        {
          name: episodesTitle,
          path: '/episodes',
        },
      ])
    );

  constructor(private translate: TranslocoService, private store: Store) {}

  ngOnInit(): void {}

  onChangeLanguage(lang: string): void {
    this.store.dispatch(CoreActions.changeLanguage({ lang }));
  }
}
