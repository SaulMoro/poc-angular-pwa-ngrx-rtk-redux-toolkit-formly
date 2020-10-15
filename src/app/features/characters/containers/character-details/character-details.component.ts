import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CharactersSelectors } from '@app/shared/data-access-characters';
import { DataState, Character, Episode } from '@app/shared/models';
import { EpisodesSelectors } from '@app/shared/data-access-episodes';
import { LocationsActions } from '@app/shared/data-access-locations';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsComponent implements OnInit {
  dataState$: Observable<DataState> = this.store.select(CharactersSelectors.getDataState);
  character$: Observable<Character> = this.store.select(CharactersSelectors.getSelectedCharacter);
  episodesDataState$: Observable<DataState> = this.store.select(EpisodesSelectors.getDataState);
  episodes$: Observable<Episode[]> = this.store.select(CharactersSelectors.getEpisodesOfSelectedCharacter);

  dataStateTypes = DataState;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  prefetchLocation(locationId: number): void {
    if (locationId) {
      this.store.dispatch(LocationsActions.hoverLocationOfCharacterDetails({ locationId }));
    }
  }
}
