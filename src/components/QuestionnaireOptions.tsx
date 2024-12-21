import { QuestionOption } from "@/types/QuestionnaireTypes";
import { useSearchParams } from "next/navigation";
import OptionWrapper from "./OptionWrapper";

export default function QuestionnaireOptions({
    isSameRoute,
    options,
}: {
    isSameRoute: boolean;
    options: QuestionOption[];
}) {
    return (
        <div
            id="options"
            style={{ opacity: `${Number(isSameRoute)}` }}
            className="flex flex-col justify-start gap-[9px] h-fit w-full text-[0.9rem] mt-[40px] overflow-y-scroll"
        >
            {options.map((option, index) => (
                <OptionWrapper key={index} optionIndex={index}>
                    <div className="option-response flex gap-[3px] relative">
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
                </OptionWrapper>
            ))}
            <br />
        </div>
    );
}
