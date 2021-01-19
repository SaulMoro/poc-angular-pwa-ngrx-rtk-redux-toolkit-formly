import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Character, Episode } from '@app/shared/models';
import { EpisodesSelectors } from '@app/shared/data-access-episodes';
import { CharactersSelectors } from '@app/shared/data-access-characters';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeDetailsComponent {
  episode$: Observable<Episode> = this.store.select<Episode>(EpisodesSelectors.getSelectedEpisode);
  characters$: Observable<Dictionary<Character>> = this.store.select(CharactersSelectors.getCharatersEntities);
  loading$: Observable<boolean> = combineLatest([
    this.store.select(EpisodesSelectors.getLoading),
    this.store.select(CharactersSelectors.getLoading),
  ]).pipe(
    map(([episodeLoading, charactersLoading]) => episodeLoading || charactersLoading),
    distinctUntilChanged(),
  );

  constructor(private readonly store: Store) {}

  trackByFn(index: number, characterId: number): number {
    return characterId;
  }
}
