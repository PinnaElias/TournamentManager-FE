import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8081/api/games';
  private gameUrl = 'http://localhost:8081/api/games/${game.id}';

  constructor(private http: HttpClient) { }

  getAllGames(page: number = 0, size: number = 10, sortBy: string = 'name'): Observable<Page<Game>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);
    return this.http.get<Page<Game>>(this.baseUrl, { params });
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/${id}`);
  }

  getGameByName(name: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/name/${name}`);
  }
}
