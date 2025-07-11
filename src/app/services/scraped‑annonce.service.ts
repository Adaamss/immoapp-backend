import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrapedAnnonce } from '../models/scraped‑annonce';

@Injectable({ providedIn: 'root' })
export class ScrapedAnnonceService {
  private apiUrl = 'http://localhost:8080/api/scrape';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<ScrapedAnnonce[]> {
    return this.http.get<ScrapedAnnonce[]>(`${this.apiUrl}/all`);
  }
}
