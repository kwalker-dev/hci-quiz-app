import { Question } from "src/app/core/question";


export interface QuestionsResolved {
  questions: Question[];
  error?: any;
}
