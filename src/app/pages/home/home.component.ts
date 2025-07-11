import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';
import { Annonce } from '../../models/annonce';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  annonces: Annonce[] = [];
  loading = true;
  error = '';

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.annonceService.getAll().subscribe({
      next: data => {
        this.annonces = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not load annonces';
        this.loading = false;
      }
    });
  }
}