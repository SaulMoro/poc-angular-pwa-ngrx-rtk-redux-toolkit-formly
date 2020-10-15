import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { EpisodesRoutingModule } from './episodes-routing.module';
import { EpisodesListComponent } from './containers/episodes-list/episodes-list.component';
import { EpisodeDetailsComponent } from './containers/episode-details/episode-details.component';

@NgModule({
  declarations: [EpisodesListComponent, EpisodeDetailsComponent],
  imports: [CommonModule, EpisodesRoutingModule, SharedModule],
})
export class EpisodesModule {}
