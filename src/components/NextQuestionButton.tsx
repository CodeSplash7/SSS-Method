// hooks
import { useState, useEffect } from "react";
import useUrl from "@/hooks/useUrl";
// animations
import {
    hideNextQuestionButton,
    showNextQuestionButton,
} from "@/animations/nextQuestionButtonAnimation";
// utils
import replaceCharAtIndex from "@/general-utils/replaceCharAtIndex";
import Questionnaire from "@/general-utils/Questionnaire";
import delay from "@/general-utils/delay";

export default function NextQuestionButton({
    selectedOption,
}: {
    selectedOption: {
        current: number | null;
        previous: number | null;
    };
}) {
    const [URL, _0, _1, goToUrl] = useUrl();
    const [isNextButtonHidden, setIsNextButtonHidden] = useState<boolean>(true);
    const [isLastQuestion, setIsLastQuestion] = useState<boolean>(
        Number(URL.queryParams.questionIndex) + 1 === Questionnaire.length,
    );
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        (async () => {
            await delay(500);
            setIsLastQuestion(
                Number(URL.queryParams.questionIndex) + 1 ===
                    Questionnaire.length,
            );
        })();
    }, [URL.queryParams.questionIndex]);

    useEffect(() => {
        const hasSelected = selectedOption.current !== null;
        setIsNextButtonHidden(!hasSelected);
    }, [selectedOption]);

    useEffect(() => {
        if (isNextButtonHidden) hideNextQuestionButton();
        else showNextQuestionButton();
    }, [isNextButtonHidden]);

    async function handleNext() {
        if (isAnimating) return;
        setIsAnimating(true);

        const newURL = { ...URL };
        let { answers, questionIndex } = { ...newURL.queryParams };

        if (!answers?.[Number(questionIndex)])
            answers += String(selectedOption.current);
        else
            answers = replaceCharAtIndex(
                answers,
                Number(questionIndex),
                String(selectedOption.current),
            );

        questionIndex = String(Number(questionIndex) + 1);

        goToUrl("power-level-form", {
            answers,
            questionIndex,
        });
        await delay(1000);
        setIsAnimating(false);
    }

    async function handleFinish() {
        if (isAnimating) return;
        setIsAnimating(true);

        const newURL = { ...URL };
        let { answers } = { ...newURL.queryParams };
        answers += String(selectedOption.current);

        goToUrl("assessment", { answers, questionIndex: null, redirect: null });
    }

    return (
        <>
            <div
                id="next-button-space-filler"
                className="opacity-0 w-full h-[0px] border-[1px] text-[20px]"
            ></div>
            <div
                onClick={isLastQuestion ? handleFinish : handleNext}
                id="next-button"
                className="absolute -bottom-[60px] hover:bg-white hover:text-[#d30c7b] hover:border-[#d30c7b] transition duration-150 border-[1px] border-white text-[20px] bg-[#d30c7b] w-full h-[60px] overflow-hidden flex items-center justify-center text-white rounded"
            >
                {isLastQuestion ? "Finish" : "Next Question"}
            </div>
        </>
    );
}
