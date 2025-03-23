import { OptionInterface } from "./option";

export interface QuestionInterface {
  id: string;
  questionText: string;
  question_options?: OptionInterface[];
}
