import { QuestionOption } from "@/types/QuestionnaireTypes";

export default function QuestionnaireOption({
    onSelect,
    option,
    optionIndex,
}: {
    onSelect: () => Promise<void>;
    option: QuestionOption;
    optionIndex: number;
}) {
    return (
        <div
            id={`option${optionIndex}`}
            onClick={async () => {
                await onSelect();
            }}
            data-index={String(optionIndex)}
            className="option relative font-[400] overflow-hidden text-[#062f33] hover:bg-white bg-[#e9ecef] border border-[2px] transition duration-150 hover:border-[#1cbac8] border-transparent rounded-[6px] min-h-fit flex justify-between items-center px-[9px] py-[10px]"
        >
            <div className="option-response flex gap-[3px] relative left-0">
                <div>{option.emoji}</div>
                <div>{option.answer}</div>
                <div className="hidden-emoji opacity-0 relative">
                    {option.emoji}
                </div>
            </div>
            <div
                style={{ transform: "translateX(0%)" }}
                className="option-detail relative text-[#6b6868]"
            >
                {option.detail}
            </div>
        </div>
    );
}
