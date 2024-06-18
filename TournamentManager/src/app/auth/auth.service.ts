import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8081/api/auth/login'; 
  private registerUrl = 'http://localhost:8081/api/auth/register';


  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }
}

