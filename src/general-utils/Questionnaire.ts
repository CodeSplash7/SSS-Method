import { Question } from "@/types/QuestionnaireTypes";

const Questionnaire: [Question, Question, Question] = [
    {
        statement: "What is your level at pullups?",
        options: [
            {
                answer: "Beginner",
                detail: "0 pullups",
                emoji: "🔧",
            },
            {
                answer: "Intermediate",
                detail: "1-15 pullups",
                emoji: "🔨",
            },
            {
                answer: "Advanced",
                detail: "15+ pullups",
                emoji: "⚒️",
            },
            {
                answer: "Master",
                detail: "(20kg+) x 8 Pullups",
                emoji: "⚔️",
            },
        ],
    },
    {
        statement: "What is your level at dips?",
        options: [
            {
                answer: "Beginner",
                detail: "0 dips",
                emoji: "🔧",
            },
            {
                answer: "Intermediate",
                detail: "1-20 dips",
                emoji: "🔨",
            },
            {
                answer: "Advanced",
                detail: "20+ dips",
                emoji: "⚒️",
            },
            {
                answer: "Master",
                detail: "(40kg+) x 8 dips",
                emoji: "⚔️",
            },
        ],
    },
    {
        statement: "Choose your program preference",
        options: [
            {
                answer: "Flexible cycle",
                detail: "Most efficient",
                emoji: "⚡",
            },
            {
                answer: "Weekly cycle",
                detail: "Most accesible",
                emoji: "🔑",
            },
        ],
    },
];

export default Questionnaire;
