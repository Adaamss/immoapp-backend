import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../../services/annonce.service';
import { Annonce } from '../../models/annonce';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-annonce-detail',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css']
})
export class AnnonceDetailComponent implements OnInit {
  annonce: Annonce | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.annonceService.getById(id).subscribe({
      next: data => {
        this.annonce = data ?? null;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load annonce';
        this.loading = false;
      }
    });
  }
}
