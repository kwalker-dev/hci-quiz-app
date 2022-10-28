export interface Question {
    Question: string;
    QuestionId: number;
    QuestionNum: number;
    Options: Options[];
  }

  export interface PostQuestion {
    UserName: string
  }

  export interface Options {
    OptionId: number;
    Value: string;
    Selected: boolean;
    Correct: boolean;
  }

  export interface Answer {
    OptionId: number;
  }

  export interface QuizResult {
    QuizId: number;
    QuestionsTotal: number;
    QuestionsCorrect: number;
    Questions: Question[]
  }