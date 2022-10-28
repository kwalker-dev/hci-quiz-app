import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { tap } from 'rxjs/operators';
import { Answer, Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8082';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*') };

  constructor(private http: HttpClient) {
  }

  postQuestion(): Observable<Question[]> {
      return this.http.post<Question[]>(this.baseUrl + '/api/user/kw/questions',"{}",this.options).pipe(tap(o => (o)));
  }

  putAnswer(answers: Answer[]): void {
    this.http.put<any>(this.baseUrl + '/api/user/kw/questions',answers,this.options).subscribe();
  }

}
  


