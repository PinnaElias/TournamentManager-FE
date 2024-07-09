import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    }, error => {
      console.error('Error fetching current user:', error);
    });
  }
}

