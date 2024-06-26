import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        const token = response.token;
        const expiresIn = 3600000; // 1 ora in millisecondi
        const expirationDate = new Date(new Date().getTime() + expiresIn);

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expirationDate.toISOString());

        console.log('Login successful', response);
        alert('Login successful!');
        this.router.navigate(['/']);
      },
      error => {
        console.error('Login failed', error);
        alert('Login failed');
      }
    );
  }
}
