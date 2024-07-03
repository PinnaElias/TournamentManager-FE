import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament, CreateTournamentRequestBody, UpdateTournamentRequestBody, DeleteTournamentResponseBody, Page } from '../models/tournament.model';
import { Team } from '../models/team.model';
import { map } from 'rxjs/operators';
import { GameService } from '../game/game.service';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private baseUrl = 'http://localhost:8081/api/tournaments';
  private teamUrl = 'http://localhost:8081/api/teams';
  private gameUrl = 'http://localhost:8081/api/games';

  constructor(private http: HttpClient) {}

  getAllTournaments(): Observable<Page<Tournament>> {
    return this.http.get<Page<Tournament>>(this.baseUrl);
  }

  getTournamentById(id: string): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.baseUrl}/${id}`);
  }

  getAvailableTeams(): Observable<Team[]> {
    return this.http.get<{ content: Team[] }>(this.teamUrl).pipe(
      map(response => {
        if (response && response.content) {
          return response.content;
        } else {
          console.error('Invalid response format for available teams:', response);
          return [];  // Restituisce un array vuoto in caso di errore
        }
      })
    );
  }

  getAvailableGames(): Observable<Game[]> {
    return this.http.get<{ content: Game[] }>(this.gameUrl).pipe(
      map(response => {
        if (response && response.content) {
          return response.content;
        } else {
          console.error('Invalid response format for available games:', response);
          return [];  // Restituisce un array vuoto in caso di errore
        }
      })
    );
  }

  createTournament(tournament: CreateTournamentRequestBody): Observable<Tournament> {
    return this.http.post<Tournament>(this.baseUrl, tournament, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateTournament(id: string, tournament: UpdateTournamentRequestBody): Observable<Tournament> {
    return this.http.put<Tournament>(`${this.baseUrl}/${id}`, tournament, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteTournament(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/me`);
  }
}
