import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserRequestBody, Role, UserRole } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  preferredRole: Role = Role.FLEXIBLE;  // valore predefinito, in caso di errore riporta su OFFENSIVE
  nationality: string = '';
  avatarUrl: string = '';
  roles: Role[] = [Role.OFFENSIVE, Role.DEFENSIVE, Role.SUPPORT, Role.CARRY, Role.FLEXIBLE];

  // Per il Demo day la creazione dell'utente sarà impostata su Admin di default,
  // per permettere lo showcase delle funzionalità
  userRole: UserRole = UserRole.USER;  // Impostato a "USER" per default
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const newUser: CreateUserRequestBody = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      preferredRole: this.preferredRole,
      nationality: this.nationality,
      avatarUrl: this.avatarUrl,
      userRole: this.userRole
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.errorMessage = err.message || 'Registration failed. Please try again.';
      }
    });
  }
}
