import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { LazyModalService } from '@app/core/lazy-modal';
import { LocationsActions, LocationsSelectors } from '@app/shared/data-access-locations';
import { Location } from '@app/shared/models';
import { TableConfig } from '@app/shared/components/table/table.component';
import {
  CharactersDialogComponent as CharactersDialogComponentType,
  CharacterDialogData,
} from '@app/modals/characters-dialog/characters-dialog.component';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsListComponent implements OnInit, OnDestroy {
  locationsTableConfig$: Observable<TableConfig<Location>> = this.store.select(LocationsSelectors.getLocations).pipe(
    switchMap((locations: Location[]) =>
      this.translocoService.selectTranslateObject('LOCATIONS.FIELDS').pipe(
        take(1),
        map(
          (translateTitles): TableConfig<Location> => ({
            headers: {
              id: translateTitles.NUM,
              name: translateTitles.NAME,
              type: translateTitles.TYPE,
              dimension: translateTitles.DIMENSION,
            },
            data: locations,
            linkData: (location: Location) => `/locations/${location.id}`,
            actionsHeader: translateTitles.RESIDENTS,
          })
        )
      )
    )
  );
  loading$: Observable<boolean> = this.store.select(LocationsSelectors.getLoading);
  page$: Observable<number> = this.store.select(LocationsSelectors.getCurrentPage);
  pages$: Observable<number> = this.store.select(LocationsSelectors.getTotalPages);

  constructor(
    private readonly store: Store,
    private lazyModal: LazyModalService<CharactersDialogComponentType>,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {}

  async openResidentsDialog(location: Location): Promise<void> {
    const { CharactersDialogComponent } = await import(
      /* webpackPrefetch: true */
      '@app/modals/characters-dialog/characters-dialog.component'
    );
    this.lazyModal.open(CharactersDialogComponent, {
      title: location.name,
      characterIds: location.residents,
    } as CharacterDialogData);

    this.store.dispatch(LocationsActions.openCharactersDialog(location));
  }

  ngOnDestroy(): void {
    this.lazyModal.close();
  }
}
