import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    const loginRequest: LoginRequest = { email: this.email, password: this.password };

    this.userService.login(loginRequest).subscribe({
      next: token => {
        localStorage.setItem('token', token);
        alert('Login successful');
        this.router.navigate(['/profile']);
      },
      error: err => {
        console.error('Login error', err);
        alert('Login failed: ' + (err.error?.message || err.message));
      }
    });
  }
}
