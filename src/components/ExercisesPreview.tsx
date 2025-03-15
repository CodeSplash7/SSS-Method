"use client";

import { Montserrat } from "next/font/google";
import { useState } from "react";
import Carousel from "./Carousel";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["italic", "normal"],
});
// LEFT {{U N D O N E}}}:
// what i want to add:
// clicking a card makes it do rotating animation, revelaing the information of the exercises on the back of the card

export default function ExercisesPreview() {
    const [exercises] = useState([
        "dips",
        "pullups",
        "legs",
        "planche",
        "front-lever",
        "1",
    ]);
    return (
        <div
            className={`w-full h-fit px-[8px] pt-[32px]
                            flex flex-col justify-start items-start gap-[16px]`}
        >
            <Title />
            <div
                className={`w-full h-[400px] sm:h-[200px] flex flex-row items-start justify-start gap-[4px]`}
            >
                <ExerciseSlideButton
                    direction="left"
                    offset={offset}
                    setOffset={setOffset}
                    requiresArrows={requiresArrows}
                />
                <div className="w-full overflow-hidden h-full">
                    <ExerciseList
                        exercises={exercises}
                        offset={offset}
                        cardListRef={cardListRef}
                        cardSpace={cardSpace}
                    />
                </div>
                <ExerciseSlideButton
                    direction="right"
                    offset={offset}
                    setOffset={setOffset}
                    requiresArrows={requiresArrows}
                />
            </div>
        </div>
    );
}

type ExerciseCard = {
    rect: { x: number; width?: number };
    originalIndex: number;
    exercise: string;
    element: HTMLElement;
};

const Title = () => (
    <div
        className={`w-full h-fit ${montserrat.className} italic font-[500] text-[36px] sm:text-[28px] text-black`}
    >
        Exercises you will do
    </div>
);

const ExerciseSlideButton = ({
    direction,
    offset,
    setOffset,
    requiresArrows,
}: {
    direction: "left" | "right";
    offset: number;
    setOffset: (newIndex: number) => void;
    requiresArrows: boolean;
}) => {
    return (
        <div
            onClick={() =>
                requiresArrows &&
                setOffset(offset + (direction === "left" ? 1 : -1))
            }
            style={{ opacity: requiresArrows ? "1" : "0" }}
            className={`bg-[#D30C7B] border border-x-[2px] border-y-0 border-white relative z-[10]
                        w-fit h-[400px] gap-[8px] px-[4px]
                        flex flex-row items-center justify-center 
                        sm:bg-white sm:border-[#D30C7B] sm:w-[32px] h-full`}
        >
            <div
                className={`flex w-[40px] h-[40px] p-[2px] items-center justify-center
                            sm:w-[28px] sm:h-[28px] sm:p-[8px] `}
            >
                <svg
                    className={`w-[16px] h-[24px]`}
                    viewBox="0 0 4 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="fill-white sm:fill-[#D30C7B]"
                        d={
                            direction === "left"
                                ? "M3.03528 5.66822L0.517578 3.15051L3.03528 0.632812L3.48217 1.0797L1.41136 3.15051L3.48217 5.22133L3.03528 5.66822Z"
                                : "M1.4115 5.66822L3.9292 3.15051L1.4115 0.632812L0.964605 1.0797L3.03541 3.15051L0.964605 5.22133L1.4115 5.66822Z"
                        }
                    />
                </svg>
            </div>
        </div>
    );
};

const ExerciseCard = ({
    rect,
    name,
    index,
}: {
    rect: { x: number; width: number };
    name: string;
    index: number;
}) => {
    return (
        <div
            style={{
                transform: `translate(${rect.x}px, 0)`,
                width: `${rect.width}px`,
            }}
            id={`exercise-card-${index}`}
            className={`absolute top-0 left-[0px] min-w-full sm:min-w-fit h-full flex justify-center `}
        >
            <div
                className={`w-[264px] sm:w-[132px] h-full flex flex-col justify-start items-center`}
            >
                <div
                    className={`w-full h-full flex flex-col items-center justify-center bg-black`}
                ></div>
                <div
                    className={`w-full h-[64px] sm:h-[32px] flex justify-center items-center bg-[#D30C7B]`}
                >
                    <div
                        className={`capitalize h-fit w-fit ${montserrat.className} font-[400] text-[30px] sm:text-[15px] text-white`}
                    >
                        {name}
                    </div>
                </div>
            </div>
        </div>
    );
};

export function useViewportWidth() {
    const [width, setWidth] = useState<number | null>(null);

    useEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth);

        updateWidth();

        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return width;
}
