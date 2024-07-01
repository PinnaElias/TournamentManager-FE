import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament, CreateTournamentRequestBody, UpdateTournamentRequestBody, DeleteTournamentResponseBody, Page } from '../models/tournament.model';
import { Team } from '../models/team.model';
@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private baseUrl = 'http://localhost:8081/api/tournaments';

  constructor(private http: HttpClient) { }

  getAllTournaments(page: number = 0, size: number = 10, sortBy: string = 'name'): Observable<Page<Tournament>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);
    return this.http.get<Page<Tournament>>(this.baseUrl, { params });
  }

  getTournamentById(id: string): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.baseUrl}/${id}`);
  }

  createTournament(tournament: CreateTournamentRequestBody): Observable<Tournament> {
    return this.http.post<Tournament>(this.baseUrl, tournament);
  }

  updateTournament(id: string, tournament: UpdateTournamentRequestBody): Observable<Tournament> {
    return this.http.put<Tournament>(`${this.baseUrl}/${id}`, tournament);
  }

  deleteTournament(id: string): Observable<DeleteTournamentResponseBody> {
    return this.http.delete<DeleteTournamentResponseBody>(`${this.baseUrl}/${id}`);
  }

  getTeamsForTournament(tournamentId: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/${tournamentId}/teams`);
  }

  addTeamToTournament(tournamentId: string, teamId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${tournamentId}/teams/${teamId}`, {});
  }

  getBracketForTournament(tournamentId: string): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/${tournamentId}/bracket`);
  }

  updateMatch(tournamentId: string, matchId: string, matchResult: { winnerId: string, loserId: string }): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${tournamentId}/matches/${matchId}/result`, matchResult);
  }

  generateBracket(tournamentId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${tournamentId}/generateBracket`, {});
  }
}
