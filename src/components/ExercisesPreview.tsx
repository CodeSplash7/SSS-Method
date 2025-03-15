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

const useResponsiveSize = () => {};

function ExerciseList({
    exercises,
    offset,
    cardListRef,
    cardSpace,
}: {
    exercises: string[];
    offset: number;
    cardSpace: number;
    cardListRef: RefObject<HTMLDivElement>;
}) {
    const [prevOffset, setPrevOffset] = useState(0);

    // const [cardWidth, setCardWidth] = useState(132);
    // const [cardsGap, setCardsGap] = useState(16);

    const [isAnimating, setIsAnimating] = useState(false);

    // const cardListRef = useRef<HTMLElement>(null);
    const [exerciseCards, setExerciseCards] = useState<ExerciseCard[]>();

    useEffect(() => {
        // if (!cardListRef.current) return;

        // let gap = 16;
        // let width = 132;
        // const availableSpace =
        //     cardListRef.current.getBoundingClientRect().width;
        // if ((viewportWidth || 9999) < 640) {
        //     width *= 2;
        //     gap = availableSpace - width;
        // }
        // setCardsGap(gap);
        // setCardWidth(width);

        setExerciseCards(
            exercises.map((exercise, eIndex) => ({
                rect: {
                    x: cardSpace * eIndex,
                    // width,
                },
                originalIndex: eIndex,
                exercise,
                element: cardListRef.current?.children[eIndex] as HTMLElement,
            })),
        );
    }, [cardListRef.current, cardSpace]);

    useEffect(() => {
        if (isAnimating) return;
        if (!cardListRef.current || !exerciseCards) return;
        setIsAnimating(true);
        const directionIntValue = offset > prevOffset ? 1 : -1;
        setPrevOffset(offset);

        setExerciseCards((prevECards) =>
            prevECards?.map((eCard) => {
                const newECard = { ...eCard };
                const n = prevECards.length;
                // const totalStep = cardWidth + cardsGap;
                const totalStep = cardSpace;

                const virtualIndex =
                    (((newECard.originalIndex + offset) % prevECards.length) +
                        prevECards.length) %
                    prevECards.length;

                const targetX = totalStep * virtualIndex;
                newECard.rect.x = targetX;

                function stopAnimation() {
                    setIsAnimating(false);
                }
                if (virtualIndex === 0 && directionIntValue > 0) {
                    animate(
                        `#${newECard.element.id}`,
                        {
                            duration: 0.4,
                            easeFunc: "ease",

                            fromStyles: {
                                transform: `translate(${targetX - totalStep}px, 0)`,
                            },
                            toStyles: {
                                transform: `translate(${targetX}px, 0)`,
                            },
                        },
                        stopAnimation,
                    );
                } else if (virtualIndex === n - 1 && directionIntValue < 0) {
                    animate(
                        `#${newECard.element.id}`,
                        {
                            duration: 0.4,
                            easeFunc: "ease",
                            fromStyles: {},
                            toStyles: {
                                transform: `translate(${-totalStep}px, 0)`,
                            },
                        },
                        () => {
                            stopAnimation();
                            animate(`#${newECard.element.id}`, {
                                duration: 0.01,
                                easeFunc: "ease",
                                fromStyles: {},
                                toStyles: {
                                    transform: `translate(${targetX}px, 0)`,
                                },
                            });
                        },
                    );
                } else {
                    animate(
                        `#${newECard.element.id}`,
                        {
                            duration: 0.4,
                            easeFunc: "ease",
                            fromStyles: {
                                transform: `translate(${targetX - directionIntValue * totalStep}px, 0)`,
                            },
                            toStyles: {
                                transform: `translate(${targetX}px, 0)`,
                            },
                        },
                        stopAnimation,
                    );
                }

                return newECard;
            }),
        );
    }, [offset]);

    useEffect(() => {
        if (!exerciseCards?.length || !cardListRef.current) return;

        const rectHeight = cardListRef.current.clientHeight;

        exerciseCards.forEach((eCard) => {
            let { x, width } = eCard.rect;
            let cardElement = eCard.element;

            cardElement.style.position = "absolute";
            cardElement.style.transform = `translate(${x}px, 0)`;
            // cardElement.style.width = `${width}px`;
            cardElement.style.height = `${rectHeight}px`;
        });
    }, []);

    return (
        <>
            <div
                ref={cardListRef as RefObject<HTMLDivElement>}
                id="exercise-list"
                className={` gap-[16px] relative w-full h-full`}
            >
                {exerciseCards?.length &&
                    exerciseCards.map((exerciseCard, i) => (
                        <ExerciseCard
                            rect={exerciseCard.rect}
                            name={exerciseCard.exercise}
                            // index={-1 * exerciseCard.index - 1}
                            index={
                                exerciseCard.exercise +
                                exerciseCard.originalIndex
                            }
                            key={i}
                        />
                    ))}
            </div>
        </>
    );
}

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
