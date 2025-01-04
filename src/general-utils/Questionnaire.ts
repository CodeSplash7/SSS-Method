import { Question } from "@/types/QuestionnaireTypes";

function generateRandomId(): number {
    return Math.floor(Math.random() * 1_000_000);
}

const Questionnaire: Question[] = [
    {
        id: generateRandomId(),
        statement: "What is your level at pullups?",
        options: [
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Beginner",
                detail: "0 pullups",
                emoji: "🔧",
            },
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Intermediate",
                detail: "1-15 pullups",
                emoji: "🔨",
            },
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Advanced",
                detail: "15+ pullups",
                emoji: "⚒️",
            },
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Master",
                detail: "(20kg+) x 8 Pullups",
                emoji: "⚔️",
            },
        ],
    },
    {
        id: generateRandomId(),
        statement: "What is your level at dips?",
        options: [
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Beginner",
                detail: "0 dips",
                emoji: "🔧",
            },
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Intermediate",
                detail: "1-20m dips",
                emoji: "🔨",
            },
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Advanced",
                detail: "20+ dips",
                emoji: "⚒️",
            },
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Master",
                detail: "(40kg+) x 8 dips",
                emoji: "⚔️",
            },
        ],
    },
    {
        id: generateRandomId(),
        statement: "Choose your program for now",
        options: [
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "4-day cycle",
                detail: "Most efficient",
                emoji: "⚡",
            },
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Weekly",
                detail: "Most accesible",
                emoji: "🔑",
            },
            {
                parentId: 0,
                id: generateRandomId(),
                answer: "Yearly",
                detail: "Most accesible",
                emoji: "🔑",
            },
        ],
    },
];
Questionnaire.forEach((question) => {
    question.options.forEach((option) => {
        option.parentId = question.id;
    });
});
export default Questionnaire;
