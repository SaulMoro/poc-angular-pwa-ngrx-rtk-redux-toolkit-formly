import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsListComponent } from './containers/locations-list/locations-list.component';
import { LocationDetailsComponent } from './containers/location-details/location-details.component';

@NgModule({
  declarations: [LocationsListComponent, LocationDetailsComponent],
  imports: [CommonModule, LocationsRoutingModule, SharedModule],
})
export class LocationsModule {}
