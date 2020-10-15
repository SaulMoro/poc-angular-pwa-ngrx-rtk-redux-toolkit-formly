import { Params, Data } from '@angular/router';

export const ROUTER_FEATURE_KEY = 'router';

/**
 * Interface for the 'Router' data
 */
export interface RouterStateUrl {
  url: string;
  route: string;
  prevRoute?: string;
  queryParams: Params;
  params: Params;
  data: Data;
}
