import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8081/api/auth/login'; 
  private registerUrl = 'http://localhost:8081/api/auth/register';
  private currentUserUrl = 'http://localhost:8081/api/users/me';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.currentUserUrl).pipe(
      catchError(error => {
        // Gestisci gli errori qui, ad esempio logga l'errore
        console.error('Error fetching current user:', error);
        throw error; // Rilancia l'errore per gestirlo nel componente chiamante
      })
    );
  }
}
