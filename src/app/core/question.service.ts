import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { tap } from 'rxjs/operators';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getQuestion(): Observable<Question[]> {
      return this.http.get<Question[]>(this.baseUrl + '/api/questions').pipe(tap(o => (o)));
  }



}
  


