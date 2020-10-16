import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Observable } from 'rxjs';

import { DataState, Character } from '@app/shared/models';
import { CharactersSelectors } from '@app/shared/data-access-characters';

export interface CharacterDialogData {
  title: string;
  characterIds: number[];
}

@Component({
  selector: 'app-characters-dialog',
  templateUrl: './characters-dialog.component.html',
  styleUrls: ['./characters-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersDialogComponent implements OnInit {
  charactersDataState$: Observable<DataState> = this.store.select(CharactersSelectors.getDataState);
  characters$: Observable<Dictionary<Character>> = this.store.select(CharactersSelectors.getCharatersEntities);

  dataStateTypes = DataState;

  constructor(private readonly store: Store, @Inject(MAT_DIALOG_DATA) public data: CharacterDialogData) {}

  ngOnInit(): void {}
}
