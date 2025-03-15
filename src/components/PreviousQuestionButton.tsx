"use client";

import useUrl from "@/hooks/useUrl";
import { useEffect, useState } from "react";

export default function PreviousQuestionButton() {
    // hooks
    const [URL, setURL] = useUrl();
    // state
    const [isVisible, setIsVisisble] = useState(false);

    useEffect(() => {
        if (Number(URL.queryParams.questionIndex)) setIsVisisble(true);
        else setIsVisisble(false);
    }, [URL.toString()]);

    function handleClick() {
        if (!isVisible) return;
        const newURL = { ...URL };
        newURL.queryParams.questionIndex = String(
            Number(newURL.queryParams.questionIndex) - 1,
        );
        setURL(newURL);
    }

    return (
        <div
            onClick={handleClick}
            style={{
                opacity: isVisible ? "1" : "0",
                width: isVisible ? "fit-content" : "1px",
            }}
            className="relative w-fit h-fit p-[4px] bg-black rounded-[40%] top-[8px]"
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
