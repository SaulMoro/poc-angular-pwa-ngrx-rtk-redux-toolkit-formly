import { Location } from '@app/shared/models';

export interface LocationResponse {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export const fromLocationResponseToLocation = (location: LocationResponse): Location => ({
  ...location,
  residents: [...location.residents?.map((url) => +url.split('character/')[1])],
  created: null,
});

export const fromLocationResponsesToLocations = (locations: LocationResponse[]): Location[] =>
  locations?.map(fromLocationResponseToLocation) ?? [];
