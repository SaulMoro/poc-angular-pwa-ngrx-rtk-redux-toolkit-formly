import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Character, DataState, Location } from '@app/shared/models';
import { LocationsSelectors } from '@app/shared/data-access-locations';
import { CharactersSelectors } from '@app/shared/data-access-characters';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationDetailsComponent implements OnInit {
  dataState$: Observable<DataState> = this.store.select(LocationsSelectors.getDataState);
  location$: Observable<Location> = this.store.select(LocationsSelectors.getSelectedLocation);
  charactersDataState$: Observable<DataState> = this.store.select(CharactersSelectors.getDataState);
  characters$: Observable<Character[]> = this.store.select(CharactersSelectors.getCharactersOfSelectedLocation);

  dataStateTypes = DataState;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}
}
