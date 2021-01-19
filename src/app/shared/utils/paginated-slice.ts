import { isRoute, matchRouteEnter, matchRouteFilter, matchRoutePageChange } from '@app/core/data-access-router';
import { createFeatureSelector } from '@ngrx/store';
import {
  EntityState,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice,
  PayloadAction,
  EntityAdapter,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { DataState, ErrorState, LoadingState } from '../models';

export interface GenericPaginatedState<T> extends EntityState<T> {
  dataState: DataState;
  pages: number;
  loadedPages: number[];
}

const loadingFailed = (state: GenericPaginatedState<any>, { payload: error }: PayloadAction<unknown>) => {
  state.dataState = { error } as ErrorState;
};

export const createGenericPaginatedSlice = <T, Reducers extends SliceCaseReducers<GenericPaginatedState<T>>>({
  name,
  entityAdapter,
  reducers,
  extraReducers,
}: {
  name: string;
  entityAdapter: EntityAdapter<T>;
  reducers: ValidateSliceCaseReducers<GenericPaginatedState<T>, Reducers>;
  extraReducers?: (builder: ActionReducerMapBuilder<GenericPaginatedState<T>>) => void;
}) => {
  const initialState: GenericPaginatedState<T> = entityAdapter.getInitialState({
    dataState: LoadingState.INIT,
    pages: 0,
    loadedPages: [],
  });

  const { reducer, actions } = createSlice({
    name,
    initialState,
    reducers: {
      loadListSuccess: (
        state: GenericPaginatedState<T>,
        { payload }: PayloadAction<{ data: T[]; pages: number; page: number }>,
      ) =>
        entityAdapter.upsertMany(
          {
            ...state,
            dataState: LoadingState.LOADED,
            pages: payload.pages,
            loadedPages: Array.from(new Set([...state.loadedPages, payload.page])),
          },
          payload.data,
        ),
      loadListFailure: loadingFailed,
      loadDetailsSuccess: (state: GenericPaginatedState<T>, { payload }: PayloadAction<T>) =>
        entityAdapter.upsertOne(
          {
            ...state,
            dataState: LoadingState.LOADED,
          },
          payload,
        ),
      loadDetailsFailure: loadingFailed,
      loadFromIdsSuccess: (state: GenericPaginatedState<T>, { payload: episodes }: PayloadAction<T[]>) =>
        entityAdapter.upsertMany(
          {
            ...state,
            dataState: LoadingState.LOADED,
          },
          episodes,
        ),
      loadFromIdsFailure: loadingFailed,
      ...reducers,
    },
    extraReducers: (builder) =>
      builder
        .addMatcher(isRoute(`/${name}`, matchRouteEnter, matchRouteFilter), (state) => {
          state.dataState = LoadingState.LOADING;
          state.pages = 0;
          state.loadedPages = [];
        })
        .addMatcher(isRoute(`/${name}`, matchRoutePageChange), (state, { payload: { routerState } }) => {
          if (!state.loadedPages.includes(routerState.page ?? 1)) {
            state.dataState = LoadingState.LOADING;
          }
        })
        .addMatcher(isRoute(`/${name}/:id`, matchRouteEnter), (state, { payload: { routerState } }) => {
          state.dataState = state.entities[+routerState.params.id] ? LoadingState.REFRESHING : LoadingState.LOADING;
        }) && extraReducers,
  });

  return {
    name,
    reducer,
    actions,
    initialState,
    featureSelector: createFeatureSelector<GenericPaginatedState<T>>(name),
  };
};
