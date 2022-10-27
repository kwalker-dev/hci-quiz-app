export interface Question {
    Question: string;
    QuestionId: number;
    QuestionNum: number;
    Options: Options[];
  }

  export interface Options {
    Value: string;
    Selected: boolean;
  }