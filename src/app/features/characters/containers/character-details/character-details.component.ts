import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CharactersSelectors } from '@app/shared/data-access-characters';
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

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  prefetchLocation(locationId: number): void {
    if (locationId) {
      this.store.dispatch(LocationsActions.hoverLocationOfCharacterDetails({ locationId }));
    }
  }
}
