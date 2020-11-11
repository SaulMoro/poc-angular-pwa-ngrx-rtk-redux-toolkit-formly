import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharactersListComponent } from './containers/characters-list/characters-list.component';
import { CharacterDetailsComponent } from './containers/character-details/character-details.component';

const routes: Routes = [
  {
    path: '',
    component: CharactersListComponent,
    data: {
      title: 'CHARACTERS.TITLE',
    },
  },
  { path: ':id', component: CharacterDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
