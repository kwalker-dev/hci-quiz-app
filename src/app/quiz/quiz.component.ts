import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  startQuiz(): void {
    this.router.navigate(['quiz-started'])
  }
}
