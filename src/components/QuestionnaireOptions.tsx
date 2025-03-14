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

export default function QuestionnaireOptions({
  isSameRoute,
  options
}: {
  isSameRoute: boolean;
  options: QuestionOption[];
}) {
  // hooks
  const [URL, setURL] = useUrl();

  // state
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isNextButtonHidden, setIsNextButtonHidden] = useState<boolean>(true);

  useEffect(() => {
    if (selectedOption !== null && isNextButtonHidden) {
      showNextQuestionButton();
      setIsNextButtonHidden(false);
    }
    if (selectedOption === null) {
      hideNextQuestionButton();
      setIsNextButtonHidden(true);
    }
  }, [selectedOption]);

  // NEXT: handle the button which should slide nicely and direct the user to the new question

  // function nextQuestion() {
  //     const newURL = { ...URL };

  //     newURL.queryParams.answers += String(selectedOption);

  //     setURL(newURL);
  // }

  return (
    <>
      <div
        id="options"
        style={{ opacity: `${Number(isSameRoute)}` }}
        className="z-[10] flex flex-col justify-start gap-[8px] flex-1 w-[95%] text-[0.9rem] mt-[40px] overflow-y-scroll"
      >
        {options.map((option, index) => (
          <QuestionnaireOption
            onSelect={async () => {
              if (selectedOption === null) {
                setSelectedOption(index);
                return await handleSelectAnimation(index);
              }
              if (selectedOption === index) {
                setSelectedOption(null);
                return await handleDeselectAnimation(index);
              }
              if (
                typeof selectedOption === "number" &&
                selectedOption !== index
              ) {
                setSelectedOption(index);
                return (async () => {
                  handlePartialSelectAnimation(index);
                  handlePartialDeselectAnimation(selectedOption);
                })();
              }
            }}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
            key={index}
            option={option}
            optionIndex={index}
          />
        ))}
      </div>

      <div
        id="next-button"
        className="text-[20px] bg-[#d30c7b] w-full basis-[80px] overflow-hidden flex items-center justify-center text-white rounded"
      >
        Next Question
      </div>
    </>
  );
}

function QuestionnaireOption({
  onSelect,
  isAnimating,
  setIsAnimating,
  option,
  optionIndex
}: {
  onSelect: () => Promise<void>;
  isAnimating: boolean;
  setIsAnimating: (state: boolean) => void;
  option: QuestionOption;
  optionIndex: number;
}) {
  return (
    <div
      onClick={async () => {
        if (isAnimating) return;
        setIsAnimating(true);
        await onSelect();
        setIsAnimating(false);
      }}
      id={`option${optionIndex}`}
      data-index={String(optionIndex)}
      className="option relative font-[400] overflow-hidden text-[#062f33] hover:bg-white bg-[#e9ecef] border border-[2px] transition duration-150 hover:border-[#1cbac8] border-transparent rounded-[6px] min-h-fit flex justify-between items-center px-[9px] py-[10px]"
    >
      <div className="option-response flex gap-[3px] relative left-0">
        <div>{option.emoji}</div>
        <div>{option.answer}</div>
        <div className="hidden-emoji opacity-0 relative">{option.emoji}</div>
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
