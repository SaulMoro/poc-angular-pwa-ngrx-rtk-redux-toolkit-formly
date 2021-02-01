import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { Location, LoadingState, DataState, PaginatedEntity, LocationsFilter } from '@app/shared/models';
import { loadingFailed, loadingStart, plain, plainWithPayload } from '@app/shared/utils';

export interface LocationsState extends EntityState<PaginatedEntity<Location>> {
  dataState: DataState;
  pages: number;
  loadedPages: number[];
}

export const locationsAdapter = createEntityAdapter<PaginatedEntity<Location>>({
  sortComparer: (e1, e2) => e1?.id - e2?.id,
});

export const initialState: LocationsState = locationsAdapter.getInitialState({
  dataState: LoadingState.INIT,
  pages: 0,
  loadedPages: [],
});

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    enterLocationsPage: plain(),
    enterLocationDetailsPage: plain(),
    newLocationsFilter: (state, { payload: filter }: PayloadAction<LocationsFilter>) => {
      // Remove the page from entities in state (not in current filter)
      const updates = state.ids.map((id) => ({
        id,
        changes: { page: undefined } as Partial<PaginatedEntity<Location>>,
      }));
      locationsAdapter.updateMany(state, updates);
      state.dataState = LoadingState.LOADING;
      state.pages = 0;
      state.loadedPages = [];
    },
    filterPageChange: plainWithPayload<number>(),
    resetFilter: plain(),
    hoverLocationOfCharacter: plainWithPayload<number>(),
    openCharactersDialog: plainWithPayload<Location>(),

    loadLocationsStart: (state, { payload }: PayloadAction<{ filter: LocationsFilter; page: number }>) =>
      loadingStart(state),
    loadLocationsSuccess: (state, { payload }: PayloadAction<{ data: Location[]; pages: number; page: number }>) => {
      locationsAdapter.upsertMany(state, payload.data);
      state.dataState = LoadingState.LOADED;
      state.pages = payload.pages;
      state.loadedPages = [...state.loadedPages, payload.page];
    },
    loadLocationsFailure: loadingFailed,

    loadLocationDetailsStart: (state, { payload: id }: PayloadAction<number>) => {
      state.dataState = state.entities[id] ? LoadingState.REFRESHING : LoadingState.LOADING;
    },
    loadLocationDetailsSuccess: (state, { payload }: PayloadAction<Location>) => {
      locationsAdapter.upsertOne(state, payload);
      state.dataState = LoadingState.LOADED;
    },
    loadLocationDetailsFailure: loadingFailed,
  },
});

const { reducer: locationsReducer, actions: LocationsActions, name: LOCATIONS_FEATURE_KEY } = locationsSlice;
export default locationsReducer;
export { LocationsActions, LOCATIONS_FEATURE_KEY };
