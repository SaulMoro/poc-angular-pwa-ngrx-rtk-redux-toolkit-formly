import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MenuItem } from '@app/core/layout/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  supportedLanguages = this.translocoService.getAvailableLangs();
  language$ = this.translocoService.langChanges$;
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
      ])
    );

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {}
}
