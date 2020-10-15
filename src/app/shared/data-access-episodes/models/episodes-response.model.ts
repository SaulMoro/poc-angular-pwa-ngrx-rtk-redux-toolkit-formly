import { EpisodeResponse } from './episode-response.model';

export interface EpisodesResponse {
  info?: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: EpisodeResponse[];
}
