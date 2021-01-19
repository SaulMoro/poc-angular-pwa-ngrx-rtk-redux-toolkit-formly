import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { HashMap, TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { LazyModalService } from '@app/core/lazy-modal';
import { EpisodesActions, EpisodesSelectors } from '@app/shared/data-access-episodes';
import { Episode } from '@app/shared/models';
import { TableConfig } from '@app/shared/components/table/table.component';
import {
  CharactersDialogComponent as CharactersDialogComponentType,
  CharacterDialogData,
} from '@app/modals/characters-dialog/characters-dialog.component';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesListComponent implements OnDestroy {
  episodesTableConfig$: Observable<TableConfig<Episode>> = this.store.select(EpisodesSelectors.getEpisodes).pipe(
    switchMap((episodes: Episode[]) =>
      this.translocoService.selectTranslateObject('EPISODES.FIELDS').pipe(
        take(1),
        map(
          (translateTitles: HashMap<string>): TableConfig<Episode> => ({
            headers: {
              id: translateTitles.NUM,
              episode: translateTitles.EPISODE,
              name: translateTitles.NAME,
              air_date: translateTitles.AIR_DATE,
            },
            data: episodes,
            linkData: (episode: Episode) => `/episodes/${episode.id}`,
            actionsHeader: translateTitles.CHARACTERS,
          }),
        ),
      ),
    ),
  );
  loading$: Observable<boolean> = this.store.select(EpisodesSelectors.getLoading);
  page$: Observable<number> = this.store.select(EpisodesSelectors.getCurrentPage);
  pages$: Observable<number> = this.store.select(EpisodesSelectors.getTotalPages);

  constructor(
    private readonly store: Store,
    private lazyModal: LazyModalService<CharactersDialogComponentType>,
    private translocoService: TranslocoService,
  ) {}

  async openCharactersDialog(episode: Episode): Promise<void> {
    const { CharactersDialogComponent } = await import(
      /* webpackPrefetch: true */
      '@app/modals/characters-dialog/characters-dialog.component'
    );
    this.lazyModal.open(CharactersDialogComponent, {
      title: episode.name,
      characterIds: episode.characters,
    } as CharacterDialogData);

    this.store.dispatch(EpisodesActions.openCharactersDialog(episode));
  }

  ngOnDestroy(): void {
    this.lazyModal.close();
  }
}
