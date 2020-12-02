import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinct, map, switchMap, take } from 'rxjs/operators';

import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { EpisodesActions, EpisodesSelectors } from '@app/shared/data-access-episodes';
import { Episode } from '@app/shared/models';
import {
  CharacterDialogData,
  CharactersDialogComponent,
} from '@app/shared/components/characters-dialog/characters-dialog.component';
import { TableConfig } from '@app/shared/components/table/table.component';

@UntilDestroy()
@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesListComponent implements OnInit, OnDestroy {
  episodes$: Observable<TableConfig<Episode>> = this.store.select(EpisodesSelectors.getEpisodes).pipe(
    switchMap((episodes: Episode[]) =>
      this.translocoService.selectTranslateObject('EPISODES.FIELDS').pipe(
        take(1),
        map(
          (translateTitles): TableConfig<Episode> => ({
            headers: {
              id: translateTitles.NUM,
              episode: translateTitles.EPISODE,
              name: translateTitles.NAME,
              air_date: translateTitles.AIR_DATE,
            },
            data: episodes,
            linkData: (episode: Episode) => `/episodes/${episode.id}`,
            actionsHeader: translateTitles.CHARACTERS,
          })
        )
      )
    )
  );
  loading$: Observable<boolean> = this.store.select(EpisodesSelectors.getLoading);
  page$: Observable<number> = this.store.select(EpisodesSelectors.getCurrentPage);
  pages$: Observable<number> = this.store.select(EpisodesSelectors.getTotalPages);
  seoConfig$ = this.translocoService.selectTranslateObject('EPISODES.SEO');

  private readonly hoverEpisode$ = new Subject<Episode>();

  constructor(
    private readonly store: Store,
    private dialog: MatDialog,
    private googleAnalytics: GoogleAnalyticsService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    // Only dispatch on hover episode during debounce time
    this.hoverEpisode$
      .pipe(
        debounceTime(300),
        distinct(({ id }) => id),
        untilDestroyed(this)
      )
      .subscribe((episode) => this.store.dispatch(EpisodesActions.hoverEpisodeLine({ episode })));
  }

  prefetchCharactersOnHover(episode: Episode): void {
    this.hoverEpisode$.next(episode);
  }

  openCharactersDialog(episode: Episode): void {
    this.dialog.open(CharactersDialogComponent, {
      data: {
        title: episode.name,
        characterIds: episode.characters,
      } as CharacterDialogData,
    });
    this.googleAnalytics.sendEvent({
      name: 'Open Characters Dialog Of Episode',
      category: GAEventCategory.INTERACTION,
      label: episode.name,
      value: episode.id,
    });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
