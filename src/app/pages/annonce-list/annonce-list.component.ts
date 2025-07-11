// import { Component, OnInit } from '@angular/core';
// import { Router, RouterLink }        from '@angular/router';
// import { CommonModule }              from '@angular/common';

// import { AnnonceService }            from '../../services/annonce.service';
// import { RatingService }             from '../../services/rating.service';
// import { Annonce }                   from '../../models/annonce';

// @Component({
//   selector: 'app-annonce-list',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './annonce-list.component.html',
//   styleUrls: ['./annonce-list.component.css']
// })
// export class AnnonceListComponent implements OnInit {
//   annonces: Annonce[] = [];
//   averageStars: { [annId: number]: number } = {};
//   loading = true;
//   error = '';

//   constructor(
//     private annonceService: AnnonceService,
//     private ratingService: RatingService,
//     private router: Router           // ← inject Router
//   ) {}

//   ngOnInit(): void {
//     this.loadAnnonces();
//   }

//   loadAnnonces() {
//     this.loading = true;
//     this.annonceService.getAll().subscribe({
//       next: data => {
//         this.annonces = data;
//         this.annonces.forEach(a => {
//           if (a.id != null) {
//             this.ratingService.getAverage(a.id).subscribe({
//               next: avg => this.averageStars[a.id!] = avg,
//               error: ()  => this.averageStars[a.id!] = 0
//             });
//           }
//         });
//         this.loading = false;
//       },
//       error: () => {
//         this.error   = 'Failed to load annonces';
//         this.loading = false;
//       }
//     });
//   }

//   onRate(annonceId: number, stars: number) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('You must be logged in to rate.');
//       return;
//     }

//     this.ratingService.rateAnnonce(annonceId, stars).subscribe({
//       next: () => this.loadAnnonces(),  // reload averages
//       error: err => alert(err.error || err)
//     });
//   }

//   deleteAnnonce(id: number) {
//     if (!confirm('Are you sure you want to delete this annonce?')) return;
//     this.annonceService.delete(id).subscribe({
//       next: () => {
//         // Remove from local array or re-fetch
//         this.annonces = this.annonces.filter(a => a.id !== id);
//       },
//       error: () => alert('Delete failed')
//     });
//   }
// }

// src/app/annonces/annonce-list/annonce-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink }        from '@angular/router';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';       

import { AnnonceService } from '../../services/annonce.service';
import { RatingService }  from '../../services/rating.service';
import { Annonce }        from '../../models/annonce';

@Component({
  selector: 'app-annonce-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.css']
})
export class AnnonceListComponent implements OnInit {
  annonces: Annonce[] = [];
  averageStars: { [annId: number]: number } = {};
  loading = true;
  error   = '';


  locationFilter?: string;
  minPriceFilter?: number;
  maxPriceFilter?: number;

  constructor(
    private annonceService: AnnonceService,
    private ratingService: RatingService,
  ) {}

  ngOnInit(): void {
    this.loadAnnonces();
  }

  loadAnnonces() {
    this.loading = true;
    this.error   = '';

    this.annonceService
      .search(
        this.locationFilter,
        this.minPriceFilter,
        this.maxPriceFilter
      )
      .subscribe({
        next: data => {
          this.annonces = data;
          this.loading  = false;
        
          this.annonces.forEach(a => {
            if (a.id != null) {
              this.ratingService.getAverage(a.id).subscribe({
                next: avg => this.averageStars[a.id!] = avg,
                error: ()  => this.averageStars[a.id!] = 0
              });
            }
          });
        },
        error: () => {
          this.error   = 'Failed to load annonces';
          this.loading = false;
        }
      });
  }

  onRate(annonceId: number, stars: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to rate.');
      return;
    }

    this.ratingService.rateAnnonce(annonceId, stars).subscribe({
      next: () => this.loadAnnonces(),
      error: err => alert(err.error || err)
    });
  }

  deleteAnnonce(id: number) {
    if (!confirm('Are you sure you want to delete this annonce?')) return;
    this.annonceService.delete(id).subscribe({
      next: () => {
        
        this.annonces = this.annonces.filter(a => a.id !== id);
      },
      error: () => alert('Delete failed')
    });
  }
}
