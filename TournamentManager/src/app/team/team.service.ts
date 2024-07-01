import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team, CreateTeamRequestBody, UpdateTeamRequestBody, DeleteTeamResponseBody, Page } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:8081/api/teams';

  constructor(private http: HttpClient) { }

  getAllTeams(page: number = 0, size: number = 10, sortBy: string = 'name'): Observable<Page<Team>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);
    return this.http.get<Page<Team>>(this.baseUrl, { params });
  }

  getTeamById(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${id}`);
  }

  getTeamsByGame(gameId: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/game/${gameId}`);
  }

  createTeam(team: CreateTeamRequestBody): Observable<Team> {
    return this.http.post<Team>(this.baseUrl, team);
  }

  addUserToTeam(teamId: string, userId: string): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/${teamId}/addUser/${userId}`, {});
  }

  updateTeam(id: string, team: UpdateTeamRequestBody): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/${id}`, team);
  }

  deleteTeam(id: string): Observable<DeleteTeamResponseBody> {
    return this.http.delete<DeleteTeamResponseBody>(`${this.baseUrl}/${id}`);
  }

  // Aggiunto il metodo per iscrivere un team a un torneo
  registerTeamToTournament(tournamentId: string, teamId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${teamId}/register/${tournamentId}`, {});
  }
}