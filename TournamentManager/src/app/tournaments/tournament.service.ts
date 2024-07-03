import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament, CreateTournamentRequestBody, UpdateTournamentRequestBody, DeleteTournamentResponseBody, Page } from '../models/tournament.model';
import { Team } from '../models/team.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private baseUrl = 'http://localhost:8081/api/tournaments';
  private teamUrl = 'http://localhost:8081/api/teams';

  constructor(private http: HttpClient) {}

  getAllTournaments(): Observable<Page<Tournament>> {
    return this.http.get<Page<Tournament>>(this.baseUrl);
  }

  getTournamentById(id: string): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.baseUrl}/${id}`);
  }

  getAvailableTeams(): Observable<Team[]> {
    return this.http.get<{ teams: Team[] }>(this.teamUrl)
      .pipe(map(response => response.teams));  // Assicurati che `response.teams` sia un array di `Team`
  }

  createTournament(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  updateTournament(id: string, tournament: UpdateTournamentRequestBody): Observable<Tournament> {
    return this.http.put<Tournament>(`${this.baseUrl}/${id}`, tournament);
  }

  deleteTournament(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/me`);
  }
}