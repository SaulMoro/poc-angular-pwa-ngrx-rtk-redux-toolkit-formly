export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  REFRESHING = 'REFRESHING', // Rehydrating data
  PREFETCHING = 'PREFETCHING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  error: any;
}

export type DataState = LoadingState | ErrorState;

export const getError = (dataState: DataState): any | null => (dataState as ErrorState)?.error ?? null;

export const isLoading = (dataState: DataState): boolean => dataState === LoadingState.LOADING;
export const isLoadingOrRefreshing = (dataState: DataState): boolean =>
  isLoading(dataState) || dataState === LoadingState.REFRESHING;
