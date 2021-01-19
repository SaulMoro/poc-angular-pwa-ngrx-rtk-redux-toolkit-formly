import { createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';

import { Location, LoadingState } from '@app/shared/models';
import { createGenericPaginatedSlice, plainWithPayload } from '@app/shared/utils';

export const locationsAdapter = createEntityAdapter<Location>({
  sortComparer: (e1, e2) => e1?.id - e2?.id,
});

const locationsSlice = createGenericPaginatedSlice({
  name: 'locations',
  entityAdapter: locationsAdapter,
  reducers: {
    hoverLocationOfCharacter: (state, { payload: locationId }: PayloadAction<number>) => {
      if (!state.entities[locationId]) {
        state.dataState = LoadingState.PREFETCHING;
      }
    },
    openCharactersDialog: plainWithPayload<Location>(),
  },
});

const {
  reducer: locationsReducer,
  actions: LocationsActions,
  name: LOCATIONS_FEATURE_KEY,
  initialState,
  featureSelector: selectLocationsState,
} = locationsSlice;
export default locationsReducer;
export { LocationsActions, LOCATIONS_FEATURE_KEY, initialState, selectLocationsState };
