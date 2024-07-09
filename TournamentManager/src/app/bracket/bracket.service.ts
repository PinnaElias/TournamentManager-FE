import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bracket, CreateBracketRequestBody, UpdateBracketRequestBody, DeleteBracketResponseBody } from '../models/bracket.model';

@Injectable({
  providedIn: 'root'
})
export class BracketService {
  private baseUrl = 'http://localhost:8081/api/brackets';

  constructor(private http: HttpClient) { }

  getAllBrackets(page: number, size: number, sortBy: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getBracketById(id: string): Observable<Bracket> {
    return this.http.get<Bracket>(`${this.baseUrl}/${id}`);
  }

  createBracket(data: CreateBracketRequestBody): Observable<Bracket> {
    return this.http.post<Bracket>(this.baseUrl, data);
  }

  updateBracket(id: string, bracket: UpdateBracketRequestBody): Observable<Bracket> {
    return this.http.put<Bracket>(`${this.baseUrl}/${id}`, bracket);
  }

  deleteBracket(id: string): Observable<DeleteBracketResponseBody> {
    return this.http.delete<DeleteBracketResponseBody>(`${this.baseUrl}/${id}`);
  }
}
