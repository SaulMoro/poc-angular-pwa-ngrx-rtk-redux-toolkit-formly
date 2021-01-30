import { CharacterGender } from './character-gender.enum';
import { CharacterSpecies } from './character-species.enum';
import { CharacterStatus } from './character-status.enum';

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: CharacterSpecies;
  type: string;
  gender: CharacterGender;
  origin: {
    id: number;
    name?: string;
  };
  location: {
    id: number;
    name?: string;
  };
  image: string;
  episodes: number[];
  firstEpisode: {
    id: number;
    name?: string;
  };
  created: null;
}
