import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { Answer, Question, QuizResult } from '../core/question';
import { QuestionService } from '../core/question.service';
import { QuestionsResolved } from '../quiz/quiz-started/question-data';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  questions: QuizResult = { Questions: [], QuizId: 0, QuestionsCorrect: 0, QuestionsTotal: 0};
  formGroup: FormGroup[] = [];
  formValid: boolean = false;
  SelectedAnswers: Answer[] = []

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.questionService.getQuizResult('kw').subscribe(data => {
      console.log(data);
      this.questions = data

      for (let index = 0; index < this.questions.Questions.length; index++) {
        this.formGroup[index] = this.fb.group({
          ctrl: ['', Validators.required]
        });
      }
    });
  
  }
}
