
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('travlr-token');

    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }

  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTrip(trip: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      trip,
      { headers: this.getAuthHeaders() }
    );
  }

  updateTrip(trip: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${encodeURIComponent(trip.code)}`,
      trip,
      { headers: this.getAuthHeaders() }
    );
  }
}
