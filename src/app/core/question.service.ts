import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { tap } from 'rxjs/operators';
import { Answer, PostQuestion, Question, QuizResult } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8082';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*') };

  private selectedAnswers: Answer[] = []

  constructor(private http: HttpClient) {
  }

  postQuestion(postQuestion: PostQuestion): Observable<Question[]> {
      return this.http.post<Question[]>(this.baseUrl + '/api/user/postQuestion',postQuestion,this.options).pipe(tap(o => (o)));
  }

  putAnswer(answers: Answer[]): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/api/user/kw/putAnswers', answers, this.options);
  }

  getQuizResult(userid: string): Observable<QuizResult> {
    return this.http.get<QuizResult>(this.baseUrl + '/api/user/kw/quizResult', this.options).pipe(tap(o => (o)));
  }

  setSelectedAnswers(selectedAnswers: Answer[]) {
    this.selectedAnswers = selectedAnswers;
  }

  getSelectedAnswers() {
    return this.selectedAnswers;
  }

}
  


