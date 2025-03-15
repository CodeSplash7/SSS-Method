import QuestionnaireOptions from "@/components/QuestionnaireOptions";
import ScaleFormOnScrollAnimationHandler from "@/components/ScaleFormOnScrollAnimationHandler";
import { Question } from "@/types/QuestionnaireTypes";
import { cookies } from "next/headers";

export default async function PowerLevelFormPage({

    searchParams,
    params,
}: {
    params: Record<symbol, any>;
    searchParams: { questionIndex: string };
}) {
    const currentRoute = params[Object.getOwnPropertySymbols(params)[7]].route;
    const isSameRoute =
        currentRoute === (await cookies()).get("previousPath")?.value;

    return (
        <div className="z-30 w-full h-screen flex flex-col justify-start items-center">
            <ScaleFormOnScrollAnimationHandler />
            <div
                className="w-[412.5px] h-[225px] relative top-[10px] bg-[#111111] max-w-[90%] flex flex-col p-[12px] justify-between items-center rounded-[10.5px]"
                style={{
                    padding: `12px`,
                }}
            >
                {/* Form title*/}
                <div className="font-bold text-[22.5px] text-[#1cbac8] text-center rounded-full px-[24px] py-[9px]">
                    Power Level Form
                </div>

                <div
                    id="form-card"
                    className="absolute overflow-hidden z-[10] top-[75px] bg-white w-[375px] h-[450px] py-[18px] px-[36px] gap-[12px] flex flex-col items-center justify-start rounded-[15px] text-black text-[22.5px] font-bold"
                >
                    {/* Progress Bar * */}
                    <div
                        id="progress-bar"
                        className="w-full h-[12px] bg-[#e7e5e5] rounded-[3px] text-[7.5px]"
                    >
                        <div
                            id="progress-fill"
                            style={{
                                width: `${(Number(searchParams.questionIndex) + 1) * 33.3333 * Number(isSameRoute)}%`,
                            }}
                            className="min-h-[3px] h-full bg-[#d30c7b] duration-[.6s] transition-width ease-in-out flex items-center justify-center text-white font-bold"
                        >
                            {Number(searchParams.questionIndex) + 1}/3
                        </div>
                    </div>
                    <QuestionPrompt
                        isSameRoute={isSameRoute}
                        questionIndex={Number(searchParams.questionIndex)}
                    />
                </div>
            </div>
        </div>
    );
}

function QuestionPrompt({
    questionIndex,
    isSameRoute,
}: {
    questionIndex: number;
    isSameRoute: boolean;
}) {
    const Questionnaire: Question[] = [
        {
            statement: "What is your level at pullups?",
            options: [
                { answer: "Beginner", detail: "0 pullups", emoji: "🔧" },
                { answer: "Intermediate", detail: "1-15 pullups", emoji: "🔨" },
                { answer: "Advanced", detail: "15+ pullups", emoji: "⚒️" },
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
                { answer: "Beginner", detail: "0 dips", emoji: "🔧" },
                {
                    answer: "Intermediate",
                    detail: "1-20m dips",
                    emoji: "🔨",
                },
                { answer: "Advanced", detail: "20+ dips", emoji: "⚒️" },
                {
                    answer: "Master",
                    detail: "(40kg+) x 8 dips",
                    emoji: "⚔️",
                },
            ],
        },
        {
            statement: "Choose your program for now",
            options: [
                {
                    answer: "4-day cycle",
                    detail: "Most efficient",
                    emoji: "⚡",
                },
                {
                    answer: "Weekly",
                    detail: "Most accesible",
                    emoji: "🔑",
                },
            ],
        },
    ];
    const { statement, options } = Questionnaire[questionIndex];
    return (
        <div className="flex flex-col w-full h-full overflow-hidden items-center justify-start gap-[16px]">
            <div
                id="question"
                className="text-[#343a40] text-[22.5px] h-fit text-center font-bold mt-[12px]"
                style={{
                    fontSize: `22.5px`,
                    marginTop: `12px`,
                    opacity: `${Number(isSameRoute)}`,
                }}
            >
                {statement}
            </div>
            <QuestionnaireOptions options={options} isSameRoute={isSameRoute} />
        </div>
    );
}
