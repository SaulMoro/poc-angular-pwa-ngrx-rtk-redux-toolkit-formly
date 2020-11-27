import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinct, map } from 'rxjs/operators';

import { GAEventCategory, GoogleAnalyticsService } from '@app/core/google-analytics';
import { EpisodesActions, EpisodesSelectors } from '@app/shared/data-access-episodes';
import { Episode, PAGE_SIZE } from '@app/shared/models';
import {
  CharacterDialogData,
  CharactersDialogComponent,
} from '@app/shared/components/characters-dialog/characters-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesListComponent implements OnInit, OnDestroy {
  episodes$: Observable<Episode[]> = this.store.select(EpisodesSelectors.getEpisodes);
  loading$: Observable<boolean> = this.store.select(EpisodesSelectors.getLoading);
  totalEpisodes$: Observable<number> = this.store.select(EpisodesSelectors.getTotalEpisodes);
  pageIndex$: Observable<number> = this.store.select(EpisodesSelectors.getCurrentPage).pipe(map((page) => page - 1));
  seoConfig$ = this.translocoService.selectTranslateObject('EPISODES.SEO');

  pageSize = PAGE_SIZE;
  displayedColumns = ['id', 'episode', 'name', 'air_date', 'characters'];

  private readonly hoverEpisode$ = new Subject<Episode>();

  constructor(
    private readonly store: Store,
    private router: Router,
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

  changePage(page: PageEvent): void {
    this.router.navigate([], {
      queryParams: { page: page.pageIndex + 1 },
      queryParamsHandling: 'merge',
    });
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
