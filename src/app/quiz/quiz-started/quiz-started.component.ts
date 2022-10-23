import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/core/question';
import { QuestionService } from 'src/app/core/question.service';
import { QuestionsResolved } from './question-data';
@Component({
  selector: 'app-quiz-started',
  templateUrl: './quiz-started.component.html',
  styleUrls: ['./quiz-started.component.css']
})
export class QuizStartedComponent implements OnInit {
  questions: Question[] = [];
  formGroup: FormGroup[] = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: QuestionsResolved = data['questions'];
      this.questions = resolvedData.questions;
    });
    this.questionService.getQuestion().subscribe({
      next: (data: Question[]) => {
        this.questions = data
      },
      error: err => {
        console.log(err);
      }
    });

    for (let index = 0; index < this.questions.length; index++) {
      this.formGroup[index] = this.fb.group({
        ctrl: ['', Validators.required]
      });
    }
  }

  submitQuiz() {
    for (let index = 0; index < this.formGroup.length; index++) {
      if (!this.formGroup[index].valid) {
        confirm('There are unanswered questions. Are you sure you want to continue?');
        break;
      }
    }
  }
}
