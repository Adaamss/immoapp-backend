import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
imports: [FormsModule,RouterModule],
standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        alert('Registration successful! Check your email for confirmation.');
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed');
      }
    });
  }
}

