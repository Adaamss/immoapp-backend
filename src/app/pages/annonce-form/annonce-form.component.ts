// src/app/pages/annonce-form/annonce-form.component.ts
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { AnnonceService }           from '../../services/annonce.service';
import { Annonce }                  from '../../models/annonce';

@Component({
  selector: 'app-annonce-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.css']
})
export class AnnonceFormComponent implements OnInit {
  annonce: Annonce = { title: '', location: '', price: 0 };
  isEdit = false;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private annonceService: AnnonceService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      this.loading = true;
      this.annonceService.getById(id).subscribe({
        next: data => { this.annonce = data; this.loading = false; },
        error: () => { this.error = 'Failed to load annonce'; }
      });
    }
  }

  onSubmit() {
    this.loading = true;
    const op = this.isEdit
      ? this.annonceService.update(this.annonce)
      : this.annonceService.create(this.annonce);

    op.subscribe({
      next: () => this.router.navigate(['/annonces']),
      error: () => { this.error = 'Save failed'; this.loading = false; }
    });
  }
}
