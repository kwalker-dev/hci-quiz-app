import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { QuestionsResolved } from './question-data';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { QuestionService } from 'src/app/core/question.service';
import { PostQuestion } from 'src/app/core/question';

@Injectable({
  providedIn: 'root'
})
export class QuizStartedResolver implements Resolve<QuestionsResolved> {
  constructor(private questionServce: QuestionService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<QuestionsResolved> {
    var postQuestion: PostQuestion = {UserName: "kw"}
    return this.questionServce.postQuestion(postQuestion).pipe(
      map(questions => ({ questions })),
      catchError(error => {
        return of({
          questions: [],
          error: `Retrieval error: ${error.message}`
        });
      })
    );
  }
}
