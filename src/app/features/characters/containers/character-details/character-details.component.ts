import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  character$: Observable<Character> = this.store.select<Character>(CharactersSelectors.getSelectedCharacter);
  loading$: Observable<boolean> = this.store.select(CharactersSelectors.getLoading);
  episodes$: Observable<(Episode | undefined)[]> = this.store.select(
    CharactersSelectors.getEpisodesOfSelectedCharacter,
  );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(CharactersActions.enterCharacterDetailsPage());
  }

  prefetchLocation(locationId: number): void {
    if (locationId) {
      this.store.dispatch(LocationsActions.hoverLocationOfCharacter(locationId));
    }
  }

  trackByEpisodeFn(index: number, episode?: Episode): number {
    return episode?.id ?? index;
  }
}
