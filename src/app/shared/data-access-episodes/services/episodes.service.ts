import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EpisodesFilter } from '@app/shared/models';
import { handleNotResultsError } from '@app/shared/utils';
import { environment } from '@environments/environment';
import { EpisodesResponse } from '../models/episodes-response.model';
import { EpisodeResponse } from '../models/episode-response.model';

const API_PATCH = '/episode';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  constructor(private http: HttpClient) {}

  getEpisodes(filter: EpisodesFilter, page: number = 1): Observable<EpisodesResponse> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('name', filter.name ?? '')
      .set('episode', filter.episode ?? '');

    return this.http
      .get<EpisodesResponse>(`${environment.apiUrl}${API_PATCH}`, { params })
      .pipe(
        handleNotResultsError<EpisodesResponse>({ results: [] }),
      );
  }

  getEpisodesFromIds(episodeIds: number[]): Observable<EpisodeResponse[]> {
    const idsFormatted: string = episodeIds.reduce((total, curr) => `${total}${curr},`, '');
    return this.http.get<EpisodeResponse[]>(`${environment.apiUrl}${API_PATCH}/${idsFormatted}`);
  }

  getEpisode(episodeId: number): Observable<EpisodeResponse> {
    return this.http.get<EpisodeResponse>(`${environment.apiUrl}${API_PATCH}/${episodeId}`);
  }
}
