import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { EpisodesListComponent } from './containers/episodes-list/episodes-list.component';
import { EpisodeDetailsComponent } from './containers/episode-details/episode-details.component';

const routes: Routes = [
  {
    path: '',
    component: EpisodesListComponent,
    data: {
      title: 'EPISODES.TITLE',
    },
  },
  { path: ':id', component: EpisodeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule],
})
export class EpisodesRoutingModule {}
