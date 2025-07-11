// app.routes.ts or wherever your routes are
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AnnonceListComponent } from './pages/annonce-list/annonce-list.component';
import { AnnonceDetailComponent } from './pages/annonce-detail/annonce-detail.component';
import { ScrapedAnnoncesComponent } from './pages/scraped-annonces/scraped-annonces.component';
import { AnnonceFormComponent } from './pages/annonce-form/annonce-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // only one default route!
  { path: 'home', component: HomeComponent },
  { path: 'annonces/new',  component: AnnonceFormComponent },
  { path: 'annonces', component: AnnonceListComponent },
  { path: 'scraped', component: ScrapedAnnoncesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'annonces/:id', component: AnnonceDetailComponent },
  { path: 'annonces/:id/edit', component: AnnonceFormComponent },
  { path: '**', redirectTo: 'home' } // catch-all
];
