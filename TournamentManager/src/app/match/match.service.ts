// src/app/services/match.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match, CreateMatchRequestBody, UpdateMatchRequestBody, DeleteMatchResponseBody, Page } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private baseUrl = 'http://localhost:8081/api/matches';

  constructor(private http: HttpClient) {}

  getAllMatches(page: number = 0, size: number = 10, sortBy: string = 'id'): Observable<Page<Match>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);
    return this.http.get<Page<Match>>(this.baseUrl, { params });
  }

  getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}/${id}`);
  }

  createMatch(match: CreateMatchRequestBody): Observable<Match> {
    return this.http.post<Match>(this.baseUrl, match);
  }

  updateMatch(id: number, match: UpdateMatchRequestBody): Observable<Match> {
    return this.http.put<Match>(`${this.baseUrl}/${id}`, match);
  }

  deleteMatch(id: number): Observable<DeleteMatchResponseBody> {
    return this.http.delete<DeleteMatchResponseBody>(`${this.baseUrl}/${id}`);
  }
}
