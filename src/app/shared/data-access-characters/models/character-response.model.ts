import { Character, CharacterGender, CharacterStatus, CharacterSpecies } from '@app/shared/models';

export interface CharacterResponse {
  id: number;
  name: string;
  status: CharacterStatus;
  species: CharacterSpecies;
  type: string;
  gender: CharacterGender;
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
    created: null,
  };
};

export const fromCharacterResponsesToCharacters = (characters: CharacterResponse[]): Character[] =>
  characters?.map(fromCharacterResponseToCharacter) ?? [];
