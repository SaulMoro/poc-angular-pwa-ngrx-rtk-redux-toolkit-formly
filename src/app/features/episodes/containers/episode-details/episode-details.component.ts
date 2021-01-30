import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Observable } from 'rxjs';

import { Character, Episode } from '@app/shared/models';
import { EpisodesActions, EpisodesSelectors } from '@app/shared/data-access-episodes';
import { CharactersSelectors } from '@app/shared/data-access-characters';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeDetailsComponent implements OnInit {
  episode$: Observable<Episode> = this.store.select<Episode>(EpisodesSelectors.getSelectedEpisode);
  characters$: Observable<Dictionary<Character>> = this.store.select(CharactersSelectors.getCharatersEntities);
  loading$: Observable<boolean> = this.store.select(EpisodesSelectors.getLoading);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(EpisodesActions.enterEpisodeDetailsPage());
  }

  trackByFn(index: number, characterId: number): number {
    return characterId;
  }
}
