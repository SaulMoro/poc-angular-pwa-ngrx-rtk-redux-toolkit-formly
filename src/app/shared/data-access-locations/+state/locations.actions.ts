import { createAction, props } from '@ngrx/store';
import { Location } from '@app/shared/models';

export const enterLocationsPage = createAction('[Locations Navigation] Enter Locations Page');
export const pageChange = createAction('[Locations Navigation] Page Change', props<{ page: number }>());
export const enterLocationDetailsPage = createAction(
  '[Locations Navigation] Enter Location Details Page',
  props<{ locationId: number }>()
);

export const filterLocations = createAction('[Locations Forms] Filter Locations');

export const hoverLocationLine = createAction('[Locations Page] Hover Location Line', props<{ location: Location }>());
export const hoverLocationOfCharacter = createAction(
  '[Characters Page] Hover Location Of Character',
  props<{ locationId: number }>()
);
export const hoverLocationOfCharacterDetails = createAction(
  '[Character Details Page] Hover Location Of Character Details',
  props<{ locationId: number }>()
);
