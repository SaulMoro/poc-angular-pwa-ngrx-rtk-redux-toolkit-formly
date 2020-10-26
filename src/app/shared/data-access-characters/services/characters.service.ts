import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingHttpClient } from '@app/core/loading-http-client';
import { CharactersFilter } from '@app/shared/models';
import { handleNotResultsError } from '@app/shared/pipes';
import { CharactersResponse } from '../models/characters-response.model';
import { CharacterResponse } from '../models/character-response.model';

const API_PATCH = '/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: LoadingHttpClient) {}

  getCharacters(filter: CharactersFilter, page: number = 1): Observable<CharactersResponse> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('name', filter.name ?? '')
      .set('status', filter.status ?? '')
      .set('species', filter.species ?? '')
      .set('type', filter.type ?? '')
      .set('gender', filter.gender ?? '');

    return this.http.get<CharactersResponse>(`${API_PATCH}`, params).pipe(
      handleNotResultsError<CharactersResponse>({ results: [] })
    );
  }

  getCharactersFromIds(characterIds: number[]): Observable<CharacterResponse[]> {
    const idsFormatted: string = characterIds.reduce((total, curr) => `${total}${curr},`, '');
    return this.http.get<CharacterResponse[]>(`${API_PATCH}/${idsFormatted}`);
  }

  getCharacter(characterId: number): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${API_PATCH}/${characterId}`);
  }
}
