export type QuestionOption = {
    answer: string;
    detail: string;
    emoji: string;
};
export type Question = {
    statement: string;
    options: QuestionOption[];
};
