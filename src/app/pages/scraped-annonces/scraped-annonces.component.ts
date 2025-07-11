import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrapedAnnonce } from '../../models/scraped‑annonce';
import { ScrapedAnnonceService } from '../../services/scraped‑annonce.service';

@Component({
  selector: 'app-scraped-annonces',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scraped-annonces.component.html',
  styleUrls: ['./scraped-annonces.component.css']
})
export class ScrapedAnnoncesComponent implements OnInit {
  annonces: ScrapedAnnonce[] = [];
  loading = true;
  error = '';

  // Pagination state
  currentPage = 1;
  pageSize = 10;

  constructor(private svc: ScrapedAnnonceService) {}

  ngOnInit(): void {
    this.svc.fetchAll().subscribe({
      next: (data) => {
        this.annonces = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load scraped data';
        this.loading = false;
      }
    });
  }

  get paginatedAnnonces(): ScrapedAnnonce[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.annonces.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.annonces.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
