import { CharacterGenderStrings } from './character-gender.enum';
import { CharacterSpeciesStrings } from './character-species.enum';
import { CharacterStatusStrings } from './character-status.enum';

export interface Character {
  id: number;
  name: string;
  status: CharacterStatusStrings;
  species: CharacterSpeciesStrings;
  type: string;
  gender: CharacterGenderStrings;
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
  created: string;
  page?: number;
}
