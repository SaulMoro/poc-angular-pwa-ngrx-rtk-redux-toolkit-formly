import { Episode } from '@app/shared/models';

export interface EpisodeResponse {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export const fromEpisodeResponseToEpisode = (episode: EpisodeResponse): Episode => ({
  ...episode,
  characters: [...episode.characters?.map((url) => +url.split('character/')[1])],
  created: null,
});

export const fromEpisodeResponsesToEpisodes = (episodes: EpisodeResponse[]): Episode[] =>
  episodes?.map(fromEpisodeResponseToEpisode) ?? [];
