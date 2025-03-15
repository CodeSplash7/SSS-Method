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
        <div className="w-full h-fit flex flex-col gap-[4px] px-[16px] pt-[32px]">
            <Title />
            <Carousel
                itemsGap={4}
                itemHeight={400}
                itemWidth={280}
                itemsPerView={1}
                options={{
                    sm: { height: 164, width: 140, gap: 16, itemsPerView: 3 },
                    lg: { itemsPerView: 4 },
                }}
            >
                <SlideButton direction="left" />
                {exercises.map((e) => (
                    <ExerciseCard key={e} name={e} />
                ))}
                <SlideButton direction="right" />
            </Carousel>
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
        className={`w-full h-fit ${montserrat.className} italic font-[500] text-[36px] sm:text-[28px] text-black `}
    >
        Exercises you will do
    </div>
);

const ExerciseCard = ({ name }: { name: string }) => {
    return (
        <div className={`h-full flex flex-col justify-start items-center`}>
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
    );
};

function SlideButton({ direction }: { direction: "left" | "right" }) {
    return (
        <div
            className={`bg-[#D30C7B] border border-x-[2px] border-y-0 border-white relative z-[10]
                        w-fit h-[400px] gap-[8px] px-[4px]
                        flex flex-row items-center justify-center 
                        sm:bg-white sm:border-[#D30C7B] sm:w-[32px] sm:h-full`}
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
}
