export type QuestionOption = {
  answer: string;
  detail: string;
  emoji: string;
};
export type Question = {
  id: number;
  statement: string;
  options: QuestionOption[];
};
