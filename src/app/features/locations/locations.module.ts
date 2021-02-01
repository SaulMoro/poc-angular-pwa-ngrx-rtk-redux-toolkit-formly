import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsListComponent } from './containers/locations-list/locations-list.component';
import { LocationDetailsComponent } from './containers/location-details/location-details.component';

@NgModule({
  declarations: [LocationsListComponent, LocationDetailsComponent],
  imports: [SharedModule, LocationsRoutingModule],
})
export class LocationsModule {}
