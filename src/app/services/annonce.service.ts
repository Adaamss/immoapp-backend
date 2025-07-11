import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce';

@Injectable({ providedIn: 'root' })
export class AnnonceService {
  private apiUrl = 'http://localhost:8080/api/annonces';

  constructor(private http: HttpClient) {}

  /** Get all annonces */
  getAll(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl);
  }

  /** Get one by id */
  getById(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/${id}`);
  }

  /** Create new annonce */
  create(annonce: Annonce): Observable<Annonce> {
    return this.http.post<Annonce>(this.apiUrl, annonce);
  }

  /** Update existing annonce */
  update(annonce: Annonce): Observable<Annonce> {
    return this.http.put<Annonce>(`${this.apiUrl}/${annonce.id}`, annonce);
  }

  /** Delete by id */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Search by location and/or price range */
  search(
    location?: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<Annonce[]> {
    let params = new HttpParams();
    if (location)   params = params.set('location', location);
    if (minPrice != null) params = params.set('minPrice', minPrice);
    if (maxPrice != null) params = params.set('maxPrice', maxPrice);
    return this.http.get<Annonce[]>(`${this.apiUrl}/search`, { params });
  }
}
