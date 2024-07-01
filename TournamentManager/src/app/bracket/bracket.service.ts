import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bracket, CreateBracketRequestBody, UpdateBracketRequestBody } from '../models/bracket.model';

@Injectable({
  providedIn: 'root'
})
export class BracketService {

  private baseUrl = 'http://localhost:8081/api/brackets';

  constructor(private http: HttpClient) { }

  getBracketByTournamentId(tournamentId: string): Observable<Bracket> {
    return this.http.get<Bracket>(`${this.baseUrl}/tournament/${tournamentId}`);
  }

  createBracket(bracket: CreateBracketRequestBody): Observable<Bracket> {
    return this.http.post<Bracket>(this.baseUrl, bracket);
  }

  updateBracket(id: string, bracket: UpdateBracketRequestBody): Observable<Bracket> {
    return this.http.put<Bracket>(`${this.baseUrl}/${id}`, bracket);
  }

  deleteBracket(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
