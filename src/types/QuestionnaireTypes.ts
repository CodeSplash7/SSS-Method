export type QuestionOption = {
    parentId: number;
    id: number;
    answer: string;
    detail: string;
    emoji: string;
};
export type Question = {
    id: number;
    statement: string;
    options: QuestionOption[];
};
