export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  REFRESHING = 'REFRESHING', // Rehydrating data
  PREFETCHING = 'PREFETCHING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  error: unknown;
}

export type DataState = LoadingState | ErrorState;

export const isLoading = (dataState: DataState): boolean => dataState === LoadingState.LOADING;
export const isLoadingOrRefreshing = (dataState: DataState): boolean =>
  isLoading(dataState) || dataState === LoadingState.REFRESHING;
