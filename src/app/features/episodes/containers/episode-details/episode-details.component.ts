import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { Character, Episode } from '@app/shared/models';
import { EpisodesSelectors } from '@app/shared/data-access-episodes';
import { CharactersSelectors } from '@app/shared/data-access-characters';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeDetailsComponent implements OnInit {
  episode$: Observable<Episode> = this.store.select(EpisodesSelectors.getSelectedEpisode);
  characters$: Observable<Dictionary<Character>> = this.store.select(CharactersSelectors.getCharatersEntities);
  loading$: Observable<boolean> = combineLatest([
    this.store.select(EpisodesSelectors.getLoading),
    this.store.select(CharactersSelectors.getLoading),
  ]).pipe(
    map(([episodeLoading, charactersLoading]) => episodeLoading || charactersLoading),
    distinctUntilChanged()
  );
  seoConfig$ = this.episode$.pipe(
    switchMap(({ name }) =>
      this.translocoService.selectTranslateObject('EPISODES.SEO_DETAILS', {
        title: { name },
        description: { name },
        'keywords.0': { name },
        'keywords.1': { name },
      })
    )
  );

  constructor(private readonly store: Store, private translocoService: TranslocoService) {}

  ngOnInit(): void {}
}
