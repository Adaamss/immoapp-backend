import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  message = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: msg => (this.message = msg),
      error: err => {
        console.error('Profile load error', err);
        this.message = 'Failed to load profile: ' + (err.error?.message || err.statusText);
      }
    });
  }
}   
