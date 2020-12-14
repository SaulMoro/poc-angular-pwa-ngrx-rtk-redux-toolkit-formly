import { Component, ChangeDetectionStrategy, ViewChild, Inject, NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Observable } from 'rxjs';

import { DIALOG_DATA, LazyModalComponent, LazyModalModule } from '@app/core/lazy-modal';
import { SharedModule } from '@app/shared/shared.module';
import { Character } from '@app/shared/models';
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
export class CharactersDialogComponent {
  characters$: Observable<Dictionary<Character>> = this.store.select(CharactersSelectors.getCharatersEntities);
  loading$: Observable<boolean> = this.store.select(CharactersSelectors.getLoading);

  @ViewChild('modalComponent') modal: LazyModalComponent<CharactersDialogComponent> | undefined;

  constructor(private readonly store: Store, @Inject(DIALOG_DATA) public data: CharacterDialogData) {}

  close(): void {
    this.modal?.close();
  }
}

@NgModule({
  imports: [SharedModule, LazyModalModule],
  declarations: [CharactersDialogComponent],
})
export class CharactersDialogComponentModule {}
