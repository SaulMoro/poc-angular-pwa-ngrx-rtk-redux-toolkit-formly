import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersListComponent } from './containers/characters-list/characters-list.component';
import { CharacterDetailsComponent } from './containers/character-details/character-details.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterDetailsCardComponent } from './components/character-details-card/character-details-card.component';
import { LoadingCharacterComponent } from './components/loading-character/loading-character.component';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharacterDetailsComponent,
    CharacterCardComponent,
    CharacterDetailsCardComponent,
    LoadingCharacterComponent,
  ],
  imports: [SharedModule, CharactersRoutingModule],
})
export class CharactersModule {}
