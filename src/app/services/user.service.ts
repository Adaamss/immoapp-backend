// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, map } from 'rxjs';
// import { LoginRequest } from '../models/login-request';
// import {jwtDecode} from 'jwt-decode';

// @Injectable({
//   providedIn: 'root'
// })
// // why 
// export class UserService {
//   private apiUrl = 'http://localhost:8080/api/users';
  
//   constructor(private http: HttpClient) {}

//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }

//  login(loginRequest: LoginRequest): Observable<string> {
//   return this.http
//     .post<{ token: string }>(`${this.apiUrl}/login`, loginRequest)
//     .pipe(map(res => {
//       const token = res.token;
//       localStorage.setItem('token', token);
//       return token;
//     }));
// }

//   confirmEmail(email: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/confirm?email=${email}`);
//   }

//   getProfile(): Observable<string> {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.apiUrl}/profile`, {
//       headers,
//       responseType: 'text'
//     });
//   }
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(loginRequest: LoginRequest): Observable<string> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, loginRequest)
      .pipe(map(res => {
        const token = res.token;
        localStorage.setItem(this.TOKEN_KEY, token);
        return token;
      }));
  }

  confirmEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/confirm?email=${email}`);
  }

  getProfile(): Observable<string> {
    const token = localStorage.getItem(this.TOKEN_KEY) || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile`, {
      headers,
      responseType: 'text'
    });
  }

  /** Returns true if a JWT is present */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    // (and any other cleanup, e.g. userId)
  }
  getUsername(): string | null {
    // decode the JWT’s “sub” or store the username on login
    const token = localStorage.getItem('token');
    if (!token) return null;
    // either decode or cache at login time:
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub as string;
  }
}

