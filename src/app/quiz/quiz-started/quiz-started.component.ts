import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Options, Answer } from 'src/app/core/question';
import { QuestionService } from 'src/app/core/question.service';
import { StatusService } from 'src/app/shared/status.service';
import { QuestionsResolved } from './question-data';
@Component({
  selector: 'app-quiz-started',
  templateUrl: './quiz-started.component.html',
  styleUrls: ['./quiz-started.component.css']
})
export class QuizStartedComponent implements OnInit {
  questions: Question[] = [];
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
    this.route.data.subscribe(data => {
      const resolvedData: QuestionsResolved = data['questions'];
      this.questions = resolvedData.questions;
    });

    for (let index = 0; index < this.questions.length; index++) {
      this.formGroup[index] = this.fb.group({
        ctrl: ['', Validators.required]
      });
    }
  }

  submitQuiz() {
    if(this.isValidForm()) {
        this.routeToSubmission();
    } else {
      if (confirm('There are unanswered questions. Are you sure you want to continue?')) {
        this.routeToSubmission();
      }
    }
  }

  isValidForm(): boolean {
    var valid: boolean = true;
    var opts: Answer[] = []
    for (let index = 0; index < this.formGroup.length; index++) {
      if (!this.formGroup[index].valid) {
        valid = false;
      } else {
        opts[index] = {OptionId: this.formGroup[index].value.ctrl.OptionId}
      }
    }
    this.SelectedAnswers = opts;
    return valid;
  }

  routeToSubmission() {
    if (this.statusService.isOnline()){
      this.questionService.putAnswer(this.SelectedAnswers).subscribe(() => {
      this.router.navigate(['/submission']);
      });
    } else {
        this.questionService.setSelectedAnswers(this.SelectedAnswers);
        this.router.navigate(['/quiz/offline']);
      }
  }
}
