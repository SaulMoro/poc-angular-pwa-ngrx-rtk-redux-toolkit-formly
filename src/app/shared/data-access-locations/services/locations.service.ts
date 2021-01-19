import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocationsFilter } from '@app/shared/models';
import { handleNotResultsError } from '@app/shared/utils';
import { environment } from '@environments/environment';
import { LocationsResponse } from '../models/locations-response.model';
import { LocationResponse } from '../models/location-response.model';

const API_PATCH = '/location';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private http: HttpClient) {}

  getLocations(filter: LocationsFilter, page: number = 1): Observable<LocationsResponse> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('name', filter.name ?? '')
      .set('type', filter.type ?? '')
      .set('dimension', filter.dimension ?? '');

    return this.http
      .get<LocationsResponse>(`${environment.apiUrl}${API_PATCH}`, { params })
      .pipe(
        handleNotResultsError<LocationsResponse>({ results: [] }),
      );
  }

  getLocationsFromIds(locationIds: number[]): Observable<LocationResponse[]> {
    const idsFormatted: string = locationIds.reduce((total, curr) => `${total}${curr},`, '');
    return this.http.get<LocationResponse[]>(`${environment.apiUrl}${API_PATCH}/${idsFormatted}`);
  }

  getLocation(locationId: number): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${environment.apiUrl}${API_PATCH}/${locationId}`);
  }
}
