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

  getAllTournaments(): Observable<Page<Tournament>> {
    return this.http.get<Page<Tournament>>(this.baseUrl);
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

  deleteTournament(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}