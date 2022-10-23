import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Question } from './question';
import { User } from './user';


export class InMemWebApiService implements InMemoryDbService {
  createDb() {
    const user: User[] = [
      {
        id: 1,
        userid: 'TestUser'
        }
    ];

    const questions: Question[] = [
      { 
        question: 'This is question 1......................' , 
        options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        selectedOption: undefined
      },
      { 
        question: 'This is question 2......................' , 
        options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        selectedOption: undefined
      },
      { 
        question: 'This is question 3......................' , 
        options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        selectedOption: undefined
      },
      { 
        question: 'This is question 4......................' , 
        options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        selectedOption: undefined
      },
      { 
        question: 'This is question 5......................' , 
        options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        selectedOption: undefined
      }
  ];

    return {
      user,
      questions
    };
  }
}
