import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/core/question';
import { QuestionService } from 'src/app/core/question.service';
import { QuestionsResolved } from './question-data';
import { QuizStartedResolver } from './quiz-started.resolver.service';
@Component({
  selector: 'app-quiz-started',
  templateUrl: './quiz-started.component.html',
  styleUrls: ['./quiz-started.component.css']
})
export class QuizStartedComponent implements OnInit {
  questions: Question[] = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService

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
  }
}
