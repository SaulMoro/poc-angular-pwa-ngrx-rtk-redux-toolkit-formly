import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Character, Location } from '@app/shared/models';
import { LocationsActions, LocationsSelectors } from '@app/shared/data-access-locations';
import { CharactersSelectors } from '@app/shared/data-access-characters';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationDetailsComponent implements OnInit {
  location$: Observable<Location> = this.store.select(LocationsSelectors.getSelectedLocation);
  characters$: Observable<Dictionary<Character>> = this.store.select(CharactersSelectors.getCharatersEntities);
  loading$: Observable<boolean> = combineLatest([
    this.store.select(LocationsSelectors.getLoading),
    this.store.select(CharactersSelectors.getLoading),
  ]).pipe(
    map(([locationLoading, charactersLoading]) => locationLoading || charactersLoading),
    distinctUntilChanged()
  );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(LocationsActions.enterLocationDetailsPage());
  }
}
