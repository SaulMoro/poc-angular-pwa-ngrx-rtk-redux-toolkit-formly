import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UiActions, UiSelectors } from '@app/core/ui';
import { MenuItem } from '@app/core/layout/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme$: Observable<'light' | 'dark'> = this.store.select(UiSelectors.getTheme);
  supportedLanguages: string[] = this.translocoService.getAvailableLangs() as string[];
  language$: Observable<string> = this.translocoService.langChanges$;
  menu$: Observable<MenuItem[]> = this.translocoService
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
      ]),
    );

  constructor(private store: Store, private translocoService: TranslocoService) {}

  changeLanguage(language: string): void {
    this.store.dispatch(UiActions.changeLanguage(language));
  }

  toggleTheme(): void {
    this.store.dispatch(UiActions.toggleTheme());
  }
}
