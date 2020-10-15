import { CharacterResponse } from './character-response.model';

export interface CharactersResponse {
  info?: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: CharacterResponse[];
}
