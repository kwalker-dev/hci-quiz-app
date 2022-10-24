import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/core/question.service';
import { StatusService } from 'src/app/shared/status.service';

@Component({
  selector: 'app-quiz-offline',
  templateUrl: './quiz-offline.component.html',
  styleUrls: ['./quiz-offline.component.css']
})
export class QuizOfflineComponent implements OnInit {
status: boolean = false
  constructor(
    private statusService: StatusService,
    private router: Router,
    private questionService: QuestionService
    ) { }

  ngOnInit(): void {
    this.statusService.getCurrentStatus()
    .subscribe(retStatus => {
      this.status = retStatus;
      if (this.status) {
        // TODO: call api to submit to server
        
        //this.router.navigate(['/submission']);
      }
    });
  }

}
