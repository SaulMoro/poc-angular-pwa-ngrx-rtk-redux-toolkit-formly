import { Character, CharacterGenderStrings } from '@app/shared/models';
import { CharacterStatusStrings } from '@app/shared/models';
import { CharacterSpeciesStrings } from '@app/shared/models/character-species.enum';

export interface CharacterResponse {
  id: number;
  name: string;
  status: CharacterStatusStrings;
  species: CharacterSpeciesStrings;
  type: string;
  gender: CharacterGenderStrings;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const fromCharacterResponseToCharacter = (character: CharacterResponse): Character => {
  const episodes: number[] = [...character?.episode?.map((url) => +url.split('episode/')[1])];
  return {
    ...character,
    origin: {
      id: +character.origin?.url.split('location/')[1],
      name: character.origin?.name,
    },
    location: {
      id: +character.location?.url.split('location/')[1],
      name: character.location?.name,
    },
    episodes,
    firstEpisode: { id: episodes[0] },
  };
};

export const fromCharacterResponsesToCharacters = (characters: CharacterResponse[]): Character[] =>
  characters?.map(fromCharacterResponseToCharacter) ?? [];
