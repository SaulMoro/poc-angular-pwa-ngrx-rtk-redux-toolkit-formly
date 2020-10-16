import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Character, DataState, Episode } from '@app/shared/models';
import { EpisodesSelectors } from '@app/shared/data-access-episodes';
import { CharactersSelectors } from '@app/shared/data-access-characters';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeDetailsComponent implements OnInit {
  dataState$: Observable<DataState> = this.store.select(EpisodesSelectors.getDataState);
  episode$: Observable<Episode> = this.store.select(EpisodesSelectors.getSelectedEpisode);
  charactersDataState$: Observable<DataState> = this.store.select(CharactersSelectors.getDataState);
  characters$: Observable<Character[]> = this.store.select(CharactersSelectors.getCharactersOfSelectedEpisode);

  dataStateTypes = DataState;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}
}
