export enum DataState {
  INIT = 'INIT',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  REFRESHING = 'REFRESHING', // Rehydrating data
  PREFETCHING = 'PREFETCHING',
  LOADED = 'LOADED',
}
