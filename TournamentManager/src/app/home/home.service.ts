import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = 'http://localhost:8081/api/tournaments';

  constructor(private http: HttpClient) { }

  getAllTournaments(page: number = 0, size: number = 10, sortBy: string = 'name'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);
    return this.http.get<any>(`${this.baseUrl}`, { params });
  }
}
