"use client";

import { QuestionOption } from "@/types/QuestionnaireTypes";
import useUrl from "@/hooks/useUrl";
import { useEffect, useState } from "react";
import {
  handleDeselectAnimation,
  handlePartialDeselectAnimation,
  handlePartialSelectAnimation,
  handleSelectAnimation
} from "@/animations/optionsAnimations";
import {
  hideNextQuestionButton,
  showNextQuestionButton
} from "@/animations/nextQuestionButtonAnimation";
import {
    slideOut as slideOutForm,
    slideIn as slideInForm,
} from "@/animations/formContentSlideAnimation";
import delay from "@/general-utils/delay";
import replaceCharAtIndex from "@/general-utils/replaceCharAtIndex";
import Questionnaire from "@/general-utils/Questionnaire";


function useAnimations() {
    const [isAnimating, setIsAnimating] = useState(false);

    async function runSelectAnimation(
        selectedOption: {
            current: number | null;
            previous: number | null;
        },
        // hasChangedQuestion: boolean,
        inBetweenCallback?: () => void,
    ) {
        if (isAnimating) return;
        setIsAnimating(true);

        const hasSelected = selectedOption.current !== null;
        const hasChangedSelection =
            selectedOption.current !== selectedOption.previous &&
            selectedOption.previous !== null;

        if (hasSelected && !hasChangedSelection) {
            await handleSelectAnimation(selectedOption.current!);
        }

        if (hasSelected && hasChangedSelection) {
            await handlePartialSelectAnimation(selectedOption.current!);
            await handlePartialDeselectAnimation(selectedOption.previous!);
        }
        if (!hasSelected && hasChangedSelection) {
            await handleDeselectAnimation(selectedOption.previous!);
        }

        inBetweenCallback?.();

        await delay(500);
        setIsAnimating(false);
    }
    return { runSelectAnimation, isAnimating };
}

function useQuestionnaireState() {
    const [URL] = useUrl();

    const [questionIndex, setQuestionIndex] = useState<{
        current: number;
        previous: number;
    }>({
        current: Number(URL.queryParams.questionIndex),
        previous: Number(URL.queryParams.questionIndex),
    });

    const [selectedOption, setSelectedOption] = useState<{
        current: number | null;
        previous: number | null;
    }>({
        current: Number(URL.queryParams.answers[questionIndex.current]),
        // current: Questionnaire[questionIndex.current].options[],
        previous: null,
    });

    const [currentOptions, setCurrentOptions] = useState<QuestionOption[]>(
        Questionnaire[Number(URL.queryParams.questionIndex)].options,
    );

    useEffect(() => {
        if (questionIndex.current === Number(URL.queryParams.questionIndex))
            return;
        setQuestionIndex({
            current: Number(URL.queryParams.questionIndex),
            previous: questionIndex.current,
        });
    }, [URL.queryParams.questionIndex]);

    return [
        [selectedOption, setSelectedOption],
        [currentOptions, setCurrentOptions],
        questionIndex,
    ] as const;
}

export default function QuestionnaireOptions({
    isSameRoute,
}: {
    isSameRoute: boolean;
}) {
    // hooks
    const [URL] = useUrl();
    const { runSelectAnimation, isAnimating } = useAnimations();

    // state
    const [
        [selectedOption, setSelectedOption],
        [currentOptions, setCurrentOptions],
        questionIndex,
    ] = useQuestionnaireState();

    useEffect(() => {
        const chosenAnswer = URL.queryParams.answers[questionIndex.current];

        const hasAnswered = !!chosenAnswer;

        (async () => {
            const hasWentBack = questionIndex.current < questionIndex.previous;
            const hasChangedQuestion =
                questionIndex.current !== questionIndex.previous;

            if (hasChangedQuestion)
                await slideOutForm(hasWentBack ? "right" : "left");
            setCurrentOptions(Questionnaire[questionIndex.current].options);
            setSelectedOption({
                current: hasAnswered ? Number(chosenAnswer) : null,
                previous: selectedOption.current,
            });

            await delay(500);

            if (hasChangedQuestion) slideInForm(hasWentBack ? "left" : "right");
        })();
    }, [questionIndex]);

    // handle options click animations
    useEffect(() => {
        runSelectAnimation(
            selectedOption,
            // questionIndex.current !== Number(URL.queryParams.questionIndex),
        );
    }, [selectedOption]);

    return (
        <>
            <div
                style={{ opacity: `${Number(isSameRoute)}` }}
                className="z-[10] flex flex-col justify-start gap-[8px] w-[95%] text-[0.9rem] mt-[40px] overflow-y-scroll"
            >
                {currentOptions.map((option, index) => (
                    <QuestionnaireOption
                        key={index}
                        onSelect={async () => {
                            if (isAnimating) return;
                            setSelectedOption({
                                current:
                                    selectedOption.current === index
                                        ? null
                                        : index,
                                previous: selectedOption.current,
                            });
                        }}
                        option={option}
                        optionIndex={index}
                    />
                ))}
            </div>
            <NextQuestionButton selectedOption={selectedOption} />
        </>
    );
}

function QuestionnaireOption({

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
