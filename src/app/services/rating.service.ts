import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = 'http://localhost:8080/api/ratings';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAverage(annonceId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average/${annonceId}`);
  }

  rateAnnonce(annonceId: number, stars: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/rate?annonceId=${annonceId}&stars=${stars}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}
