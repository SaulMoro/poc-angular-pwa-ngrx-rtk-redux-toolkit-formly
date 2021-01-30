import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dictionary } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';

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
  location$: Observable<Location> = this.store.select<Location>(LocationsSelectors.getSelectedLocation);
  characters$: Observable<Dictionary<Character>> = this.store.select(CharactersSelectors.getCharatersEntities);
  loading$: Observable<boolean> = this.store.select(LocationsSelectors.getLoading);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(LocationsActions.enterLocationDetailsPage());
  }

  trackByFn(index: number, characterId: number): number {
    return characterId ?? index;
  }
}
