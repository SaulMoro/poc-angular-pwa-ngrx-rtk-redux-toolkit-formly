import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingHttpClient } from '@app/core/loading-http-client';
import { LocationsFilter } from '@app/shared/models';
import { handleNotResultsError } from '@app/shared/utils';
import { LocationsResponse } from '../models/locations-response.model';
import { LocationResponse } from '../models/location-response.model';

const API_PATCH = '/location';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private http: LoadingHttpClient) {}

  getLocations(filter: LocationsFilter, page: number = 1): Observable<LocationsResponse> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('name', filter.name ?? '')
      .set('type', filter.type ?? '')
      .set('dimension', filter.dimension ?? '');

    return this.http.get<LocationsResponse>(`${API_PATCH}`, params).pipe(
      handleNotResultsError<LocationsResponse>({ results: [] })
    );
  }

  getLocationsFromIds(locationIds: number[]): Observable<LocationResponse[]> {
    const idsFormatted: string = locationIds.reduce((total, curr) => `${total}${curr},`, '');
    return this.http.get<LocationResponse[]>(`${API_PATCH}/${idsFormatted}`);
  }

  getLocation(locationId: number): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${API_PATCH}/${locationId}`);
  }
}
