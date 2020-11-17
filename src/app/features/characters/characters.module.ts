import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersListComponent } from './containers/characters-list/characters-list.component';
import { CharacterDetailsComponent } from './containers/character-details/character-details.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharactersFilterFormComponent } from './components/characters-filter-form/characters-filter-form.component';
import { CharacterDetailsCardComponent } from './components/character-details-card/character-details-card.component';
import { LoadingCharacterComponent } from './components/loading-character/loading-character.component';
import { LoadingEpisodeComponent } from './components/loading-episode/loading-episode.component';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharacterDetailsComponent,
    CharacterCardComponent,
    CharactersFilterFormComponent,
    CharacterDetailsCardComponent,
    LoadingCharacterComponent,
    LoadingEpisodeComponent,
  ],
  imports: [SharedModule, CharactersRoutingModule],
})
export class CharactersModule {}
