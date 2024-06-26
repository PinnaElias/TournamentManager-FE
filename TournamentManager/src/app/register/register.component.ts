import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  likedGames: string = '';
  preferredRole: string = '';
  nationality: string = '';
  avatarUrl: string = '';
  userRole: string = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const user = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      likedGames: this.likedGames.split(',').map(game => game.trim()), // Converti in lista di giochi
      preferredRole: this.preferredRole,
      nationality: this.nationality,
      avatarUrl: this.avatarUrl,
      userRole: this.userRole
    };

    this.authService.register(user).subscribe(
      response => {
        // Gestisci la risposta del backend (ad esempio, naviga alla pagina di login)
        console.log('Registration successful', response);
      },
      error => {
        // Gestisci l'errore (ad esempio, mostra un messaggio di errore)
        console.error('Registration failed', error);
      }
    );
  }
}
