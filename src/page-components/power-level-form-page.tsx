import ScaleDownFormAnimation from "@/components/ScaleDownFormAnimation";

export default function PowerLevelFormPage() {
    return (
        <div className="z-30 w-full h-screen flex flex-col justify-start items-center">
            <ScaleDownFormAnimation formId="form-card" />
            <div
                className="w-[412.5px] h-[225px] relative top-[10px] bg-[#111111] max-w-[90%] flex flex-col p-[12px] justify-between items-center rounded-[10.5px]"
                style={{
                    padding: `12px`, // Reduced padding
                }}
            >
=======
export default function PowerLevelFormPage({
    searchParams,
}: {
    searchParams: { questionIndex: string };
}) {
    return (
        <div className="z-30 w-full h-screen flex flex-col justify-start items-center">
            <ScaleDownFormAnimation />
            <div
                className="w-[412.5px] h-[225px] relative top-[10px] bg-[#111111] max-w-[90%] flex flex-col p-[12px] justify-between items-center rounded-[10.5px]"
                style={{
                    padding: `12px`,
                }}
            >
                {/* Form title*/}
>>>>>>> b654e7968376c633880115d05aa9946cb3429512
                <div className="font-bold text-[22.5px] text-[#1cbac8] text-center rounded-full px-[24px] py-[9px]">
                    Power Level Form
                </div>

                <div
                    id="form-card"
                    className="absolute z-[10] top-[75px] bg-white w-[375px] h-[450px] py-[18px] px-[36px] gap-[12px] flex flex-col items-center justify-start rounded-[15px] text-black text-[22.5px] font-bold"
                >
                    {/* Progress Bar */}
                    <div
                        id="progress-bar"
                        className="w-full h-[12px] bg-[#e7e5e5] rounded-[3px] text-[7.5px]"
                    >

                        <div
                            style={{
                                width: `${(Number(searchParams.questionIndex) + 1) * 33.3333}%`,
                            }}
                            className="min-h-[3px] h-full bg-[#d30c7b] flex items-center justify-center text-white font-bold"
                        >
                            {Number(searchParams.questionIndex) + 1}/3
                        </div>
                    </div>
                    <QuestionPrompt
                        questionIndex={Number(searchParams.questionIndex)}
                    />
                </div>
            </div>
        </div>
    );
}


type QuestionOption = { answer: string; detail: string; emoji: string };
type Question = {
    statement: string;
    options: QuestionOption[];
};

function QuestionPrompt({ questionIndex }: { questionIndex: number }) {
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
        <>
            <div
                id="question"
                className="text-[#343a40] text-[22.5px] h-fit text-center font-bold mt-[12px]"
                style={{
                    fontSize: `22.5px`,
                    marginTop: `12px`,
                }}
            >
                {statement}
            </div>
            <div
                id="options"
                className="flex flex-col justify-start gap-[9px] h-fit w-full text-[0.9rem] mt-[40px] overflow-y-scroll"
            >
                {options.map((option, index) => (
                    <div
                        key={index}
                        className="option bg-[#e9ecef] rounded-[6px] h-fit flex justify-between items-center px-[9px] py-[12px]"
                    >
                        <div className="flex text-[#062f33] gap-[3px]">
                            <div>{option.emoji}</div>
                            <div>{option.answer}</div>
                        </div>

                        <div className="text-[#6b6868]">{option.detail}</div>
                    </div>
                ))}
                <br />
            </div>
        </>
    );
}
