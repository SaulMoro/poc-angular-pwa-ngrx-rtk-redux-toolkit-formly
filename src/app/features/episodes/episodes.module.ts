import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { EpisodesRoutingModule } from './episodes-routing.module';
import { EpisodesListComponent } from './containers/episodes-list/episodes-list.component';
import { EpisodeDetailsComponent } from './containers/episode-details/episode-details.component';
import { EpisodesFilterFormComponent } from './components/episodes-filter-form/episodes-filter-form.component';

@NgModule({
  declarations: [EpisodesListComponent, EpisodeDetailsComponent, EpisodesFilterFormComponent],
  imports: [CommonModule, EpisodesRoutingModule, SharedModule],
})
export class EpisodesModule {}
