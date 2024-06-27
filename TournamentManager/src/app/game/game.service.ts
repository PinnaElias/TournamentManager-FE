import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/team.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8081/api/games';

  constructor(private http: HttpClient) {}

  getAllGames(page: number = 0, size: number = 10, sortBy: string = 'id'): Observable<Page<Game>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);

    return this.http.get<Page<Game>>(this.baseUrl, { params });
  }

  getGameById(id: string): Observable<Game> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Game>(url);
  }
}
