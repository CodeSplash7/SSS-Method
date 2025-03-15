"use client";

// types
import { QuestionOption } from "@/types/QuestionnaireTypes";

// hooks
import useUrl from "@/hooks/useUrl";
import { useEffect, useState } from "react";

// animations
import {
  handleDeselectAnimation,
  handlePartialDeselectAnimation,
  handlePartialSelectAnimation,
  handleSelectAnimation
} from "@/animations/optionsAnimations";
import {
  slideOut as slideOutForm,
  slideIn as slideInForm
} from "@/animations/formContentSlideAnimation";

// utils
import delay from "@/general-utils/delay";

// data
import Questionnaire from "@/general-utils/Questionnaire";

// components
import NextQuestionButton from "./NextQuestionButton";
import QuestionnaireOption from "./QuestionnaireOption";

type CurrentPrevious<T> = {
  current: T;
  previous: T;
};

function useAnimations() {
  const [URL] = useUrl();

  const [isAnimating, setIsAnimating] = useState(false);
  const [hasChangedQuestion, setHasChangedQuestion] = useState(false);

  useEffect(() => {
    setHasChangedQuestion(true);
  }, [URL.queryParams.questionIndex]);

    async function runSelectAnimation(
        selectedOption: {
            current: number | null;
            previous: number | null;
        },
        inBetweenCallback?: () => void,
    ) {
        if (isAnimating) return;
        setIsAnimating(true);
        setHasChangedQuestion(false);

    // conditions
    const hasSelected = selectedOption.current !== null;
    const hasChangedSelection =
      selectedOption.current !== selectedOption.previous &&
      selectedOption.previous !== null;

    if (hasSelected && (!hasChangedSelection || hasChangedQuestion)) {
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

    const [questionIndex, setQuestionIndex] = useState<CurrentPrevious<number>>(
        {
            current: Number(URL.queryParams.questionIndex),
            previous: Number(URL.queryParams.questionIndex),
        },
    );
    const [selectedOption, setSelectedOption] = useState<
        CurrentPrevious<number | null>
    >({
        current: URL.queryParams.answers[questionIndex.current]
            ? Number(URL.queryParams.answers[questionIndex.current])
            : null,
        previous: null,
    });

  const [currentOptions, setCurrentOptions] = useState<QuestionOption[]>(
    Questionnaire[Number(URL.queryParams.questionIndex)].options
  );

  useEffect(() => {
    if (questionIndex.current === Number(URL.queryParams.questionIndex)) return;
    setQuestionIndex({
      current: Number(URL.queryParams.questionIndex),
      previous: questionIndex.current
    });
  }, [URL.queryParams.questionIndex]);

  return [
    [selectedOption, setSelectedOption],
    [currentOptions, setCurrentOptions],
    questionIndex
  ] as const;
}

export default function QuestionnaireOptions({
  isSameRoute
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
    questionIndex
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
        previous: selectedOption.current
      });

      await delay(500);

      if (hasChangedQuestion) slideInForm(hasWentBack ? "left" : "right");
    })();
  }, [questionIndex]);

  // handle options click animations
  useEffect(() => {
    runSelectAnimation(selectedOption);
  }, [selectedOption]);

  return (
    <>
      <div
        id="options"
        style={{ opacity: `${Number(isSameRoute)}` }}
        className="z-[10] h-full flex flex-col justify-start gap-[8px] w-[95%] text-[0.9rem] mt-[40px] overflow-y-scroll"
      >
        {currentOptions.map((option, index) => (
          <QuestionnaireOption
            key={index}
            onSelect={async () => {
              if (isAnimating) return;
              setSelectedOption({
                current: selectedOption.current === index ? null : index,
                previous: selectedOption.current
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
