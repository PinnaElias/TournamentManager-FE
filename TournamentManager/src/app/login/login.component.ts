import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Gestisci la risposta del backend (ad esempio, salvataggio del token)
        console.log('Login successful', response);
      },
      error => {
        // Gestisci l'errore (ad esempio, credenziali errate)
        console.error('Login failed', error);
      }
    );
  }
}
