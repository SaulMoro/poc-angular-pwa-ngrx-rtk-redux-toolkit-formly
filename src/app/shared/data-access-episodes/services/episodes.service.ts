import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingHttpClient } from '@app/core/loading-http-client';
import { EpisodesFilter } from '@app/shared/models';
import { handleNotResultsError } from '@app/shared/pipes';
import { EpisodesResponse } from '../models/episodes-response.model';
import { EpisodeResponse } from '../models/episode-response.model';

const API_PATCH = '/episode';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  constructor(private http: LoadingHttpClient) {}

  getEpisodes(filter: EpisodesFilter, page: number = 1): Observable<EpisodesResponse> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('name', filter.name ?? '')
      .set('episode', filter.episode ?? '');

    return this.http.get<EpisodesResponse>(`${API_PATCH}`, params).pipe(
      handleNotResultsError<EpisodesResponse>({ results: [] })
    );
  }

  getEpisodesFromIds(episodeIds: number[]): Observable<EpisodeResponse[]> {
    const idsFormatted: string = episodeIds.reduce((total, curr) => `${total}${curr},`, '');
    return this.http.get<EpisodeResponse[]>(`${API_PATCH}/${idsFormatted}`);
  }

  getEpisode(episodeId: number): Observable<EpisodeResponse> {
    return this.http.get<EpisodeResponse>(`${API_PATCH}/${episodeId}`);
  }
}
