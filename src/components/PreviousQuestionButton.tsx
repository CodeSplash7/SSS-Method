"use client";

import { animate } from "@/general-utils/app-routes";
import delay from "@/general-utils/delay";
import useUrl from "@/hooks/useUrl";
import { useEffect, useState } from "react";

async function handleShowAnimation() {
    await delay(500); // duration for the form to slide out of view
    animate("#previous-question-button", {
        duration: 0.3,
        easeFunc: "ease",
        fromStyles: {},
        toStyles: { opacity: 1 },
    });
}

async function handleHideAnimation() {
    await delay(500); // duration for the form to slide out of view
    animate("#previous-question-button", {
        duration: 0.3,
        easeFunc: "ease",
        fromStyles: {},
        toStyles: { opacity: 0 },
    });
}

export default function PreviousQuestionButton() {
    // hooks
    const [URL, setURL] = useUrl();
    // state
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentOpacity] = useState(
        Number(URL.queryParams.questionIndex || 0),
    );

    useEffect(() => {
        (async () => {
            const newQuestionIndex = Number(URL.queryParams.questionIndex);
            if (newQuestionIndex) setIsVisible(true);
            else setIsVisible(false);

            setIsAnimating(true);
            if (newQuestionIndex) await handleShowAnimation();
            else await handleHideAnimation();

            setIsAnimating(false);
        })();
    }, [URL.toString()]);

    async function handleClick() {
        const newURL = { ...URL };
        if (!isVisible || isAnimating) return;

        newURL.queryParams.questionIndex = String(
            Number(newURL.queryParams.questionIndex) - 1,
        );
        setURL(newURL);
    }

    return (
        <div
            onClick={handleClick}
            style={{ opacity: currentOpacity }}
            id="previous-question-button"
            className="w-[1px] w-[20px] flex items-center justify-center h-[20px] bg-black rounded-[40%]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="12px"
                viewBox="0 -960 960 960"
                width="12px"
                fill="#e8eaed"
            >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
        </div>
    );
}
