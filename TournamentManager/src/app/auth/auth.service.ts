import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CreateUserRequestBody, User, UserRole } from '../models/user.model';
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

  register(user: CreateUserRequestBody): Observable<any> {
    const userWithDefaultRole: CreateUserRequestBody = { ...user, userRole: UserRole.USER };
    return this.http.post<any>(this.registerUrl, userWithDefaultRole).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.currentUserUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error) {
      if (error.error.message) {
        errorMessage = error.error.message;
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      }
    } else {
      errorMessage = error.message;
    }
    console.error('An error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
