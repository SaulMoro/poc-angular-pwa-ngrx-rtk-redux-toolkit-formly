import { LocationResponse } from './location-response.model';

export interface LocationsResponse {
  info?: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: LocationResponse[];
}
