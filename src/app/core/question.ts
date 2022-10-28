export interface Question {
    Question: string;
    QuestionId: number;
    QuestionNum: number;
    Options: Options[];
  }

  export interface Options {
    OptionId: number;
    Value: string;
    Selected: boolean;
  }

  export interface Answer {
    OptionId: number;
  }