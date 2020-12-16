import { createAction, props } from '@ngrx/store';
import { Location, LocationsFilter } from '@app/shared/models';

export const enterLocationsPage = createAction('[Locations Page] Enter Locations Page');
export const openCharactersDialog = createAction(
  '[Locations Page] Open Characters Dialog',
  props<{ location: Location }>()
);
export const enterLocationDetailsPage = createAction('[Locations Details Page] Enter Location Details Page');

export const filterLocations = createAction(
  '[Locations Navigation] Filter Locations',
  props<{ filter: LocationsFilter; page: number }>()
);
export const filterPageChange = createAction(
  '[Locations Navigation] Page Change',
  props<{ filter: LocationsFilter; page: number }>()
);

export const hoverLocationOfCharacter = createAction(
  '[Characters Page] Hover Location Of Character',
  props<{ locationId: number }>()
);
export const hoverLocationOfCharacterDetails = createAction(
  '[Character Details Page] Hover Location Of Character Details',
  props<{ locationId: number }>()
);
