import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CharactersActions, CharactersSelectors } from '@app/shared/data-access-characters';
import { Character, Episode } from '@app/shared/models';
import { LocationsActions } from '@app/shared/data-access-locations';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsComponent implements OnInit {
  character$: Observable<Character> = this.store.select(CharactersSelectors.getSelectedCharacter);
  loading$: Observable<boolean> = this.store.select(CharactersSelectors.getLoadingCharacter);
  episodes$: Observable<Episode[]> = this.store.select(CharactersSelectors.getEpisodesOfSelectedCharacter);
  seoConfig$ = this.character$.pipe(
    switchMap(({ name }) =>
      this.translocoService.selectTranslateObject('CHARACTERS.SEO_DETAILS', {
        title: { name },
        description: { name },
        'keywords.0': { name },
        'keywords.1': { name },
      })
    )
  );

  constructor(private readonly store: Store, private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.store.dispatch(CharactersActions.enterCharacterDetailsPage());
  }

  prefetchLocation(locationId: number): void {
    if (locationId) {
      this.store.dispatch(LocationsActions.hoverLocationOfCharacterDetails({ locationId }));
    }
  }
}
