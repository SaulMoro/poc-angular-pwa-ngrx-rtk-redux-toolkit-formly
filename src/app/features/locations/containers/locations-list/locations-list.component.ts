import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormlyFormOptions } from '@ngx-formly/core';
import { HashMap, TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { LazyModalService } from '@app/core/lazy-modal';
import {
  CharactersDialogComponent as CharactersDialogComponentType,
  CharacterDialogData,
} from '@app/features/characters/containers/characters-dialog/characters-dialog.component';
import { LocationsActions, LocationsSelectors } from '@app/shared/data-access-locations';
import { Location, LocationsFilter } from '@app/shared/models';
import { TableConfig } from '@app/shared/components/table/table.component';
import { locationsFilterForm } from '../../forms/locations-filter.form';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsListComponent implements OnInit {
  locationsTableConfig$: Observable<TableConfig<Location>> = this.store.select(LocationsSelectors.getLocations).pipe(
    switchMap((locations: Location[]) =>
      this.translocoService.selectTranslateObject('LOCATIONS.FIELDS').pipe(
        take(1),
        map(
          (translateTitles: HashMap<string>): TableConfig<Location> => ({
            headers: {
              id: translateTitles.NUM,
              name: translateTitles.NAME,
              type: translateTitles.TYPE,
              dimension: translateTitles.DIMENSION,
            },
            data: locations,
            linkData: (location: Location) => `/locations/${location.id}`,
            actionsHeader: translateTitles.RESIDENTS,
          }),
        ),
      ),
    ),
  );
  loading$: Observable<boolean> = this.store.select(LocationsSelectors.getLoading);
  page$: Observable<number> = this.store.select(LocationsSelectors.getCurrentPage);
  pages$: Observable<number> = this.store.select(LocationsSelectors.getTotalPages);

  form = locationsFilterForm;
  formOptions: FormlyFormOptions = {};

  constructor(
    private readonly store: Store,
    private lazyModal: LazyModalService<CharactersDialogComponentType>,
    private translocoService: TranslocoService,
  ) {}

  ngOnInit() {
    this.store.dispatch(LocationsActions.enterLocationsPage());
  }

  newFilter(filter: LocationsFilter) {
    this.store.dispatch(LocationsActions.newLocationsFilter(filter));
  }

  filterPageChange(page: number) {
    this.store.dispatch(LocationsActions.filterPageChange(page));
  }

  resetFilter() {
    this.store.dispatch(LocationsActions.resetFilter());
  }

  async openResidentsDialog(location: Location): Promise<void> {
    const { CharactersDialogComponent } = await import(
      /* webpackPrefetch: true */
      '@app/features/characters/containers/characters-dialog/characters-dialog.component'
    );
    this.lazyModal.open(CharactersDialogComponent, {
      title: location.name,
      characterIds: location.residents,
    } as CharacterDialogData);

    this.store.dispatch(LocationsActions.openCharactersDialog(location));
  }
}
