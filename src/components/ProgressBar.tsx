import PreviousQuestionButton from "./PreviousQuestionButton";
import QuestionnaireOptions from "./QuestionnaireOptions";

export default function ProgressBar({
    questionIndex,
}: {
    questionIndex: number;
}) {
    return (
        <div
            id="progress-bar"
            className="w-full h-[12px] bg-[#e7e5e5] rounded-[3px] text-[7.5px]"
        >
            <div className="absolute w-fit h-fit left-[10px] top-[14px]">
                <PreviousQuestionButton />
            </div>
            <div
                id="progress-fill"
                style={{
                    width: `${((Number(questionIndex) + 1) * 100) / QuestionnaireOptions.length}%`,
                }}
                className="min-h-[3px] h-full bg-[#d30c7b] duration-[.6s] transition-width ease-in-out flex items-center justify-center text-white font-bold"
            >
                {Number(questionIndex) + 1}/3
            </div>
        </div>
    );
}
