import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  ExtraOptions,
  NoPreloading
} from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { QuizStartedComponent } from './quiz/quiz-started/quiz-started.component';
import { QuizStartedGuard } from './quiz/quiz-started/quiz-started.guard';
import { QuizStartedResolver } from './quiz/quiz-started/quiz-started.resolver.service';
import { QuizComponent } from './quiz/quiz.component';
import { SubmissionComponent } from './submission/submission.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent ,},
  { 
    path: 'quiz-started', 
    component: QuizStartedComponent, 
    canActivate: [QuizStartedGuard], 
    resolve: { questions: QuizStartedResolver }
  },
  { path: 'submission', component: SubmissionComponent },
  { path: '', redirectTo: 'quiz', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

const options: ExtraOptions = { preloadingStrategy: NoPreloading };

@NgModule({
  imports: [RouterModule.forRoot(routes, options)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
