import { useState, useEffect } from "react";
import {
    hideNextQuestionButton,
    showNextQuestionButton,
} from "@/animations/nextQuestionButtonAnimation";
import replaceCharAtIndex from "@/general-utils/replaceCharAtIndex";
import useUrl from "@/hooks/useUrl";

export default function NextQuestionButton({
    selectedOption,
}: {
    selectedOption: {
        current: number | null;
        previous: number | null;
    };
}) {
    const [URL, setURL] = useUrl();
    const [isNextButtonHidden, setIsNextButtonHidden] = useState<boolean>(true);

    useEffect(() => {
        const hasSelected = selectedOption.current !== null;
        setIsNextButtonHidden(!hasSelected);
    }, [selectedOption]);

    useEffect(() => {
        if (isNextButtonHidden) hideNextQuestionButton();
        else showNextQuestionButton();
    }, [isNextButtonHidden]);

    async function handleNext() {
        const newURL = { ...URL };
        let { answers, questionIndex } = { ...newURL.queryParams };

        if (!answers[Number(questionIndex)])
            answers += String(selectedOption.current);
        else
            answers = replaceCharAtIndex(
                answers,
                Number(questionIndex),
                String(selectedOption.current),
            );

        questionIndex = String(Number(questionIndex) + 1);
        newURL.queryParams = { ...newURL.queryParams, answers, questionIndex };

        setURL(newURL);
    }

    return (
        <>
            <div
                id="next-button-space-filler"
                className="opacity-0 w-full h-[0px] border-[1px] text-[20px]"
            ></div>
            <div
                onClick={handleNext}
                id="next-button"
                className="absolute -bottom-[60px] hover:bg-white hover:text-[#d30c7b] hover:border-[#d30c7b] transition duration-150 border-[1px] border-white text-[20px] bg-[#d30c7b] w-full h-[60px] overflow-hidden flex items-center justify-center text-white rounded"
            >
                Next Question
            </div>
        </>
    );
}
