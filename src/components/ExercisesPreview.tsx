"use client";

import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { animate } from "@/general-utils/app-routes";

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
        <div className="w-full h-fit flex flex-col gap-[4px] pt-[32px]">
            <div className="w-full h-fit px-[64px]">
                <Title />
            </div>
            <Carousel
                itemsGap={4}
                itemHeight={400}
                itemWidth={280}
                itemsPerView={1}
                options={{
                    sm: { height: 200, width: 140, gap: 16, itemsPerView: 3 },
                    lg: { itemsPerView: 4 },
                }}
            >
                <SlideButton direction="left" />
                {exercises.map((e, i) => (
                    <ExerciseCard key={e} name={e} index={i} />
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

const CardImage = () => (
    <div
        className={`w-full h-full flex flex-col items-center justify-center bg-black`}
    ></div>
);

const CardTitle = ({ title }: { title: string }) => (
    <div
        className={`capitalize h-fit w-fit ${montserrat.className} font-[400] text-[30px] sm:text-[15px] text-white`}
    >
        {title}
    </div>
);

const ExerciseCard = ({ name, index }: { name: string; index: number }) => {
    return (
        <div className="card">
            <div className="card-inner">
                <CardFrontSide name={name} />
                <CardBackSide name={name} />
            </div>
        </div>
    );
};

const CardFrontSide = ({ name }: { name: string }) => (
    <div className="flex flex-col w-full h-full absolute bg-transparent [transform:rotateY(0deg)] [backface-visibility:hidden]">
        <CardImage />
        <div
            className={` w-full h-[64px] sm:h-[32px] flex justify-center items-center bg-[#D30C7B]`}
        >
            <CardTitle title={name} />
        </div>
    </div>
);

const CardBackSide = ({ name }: { name: string }) => {
    const primaryMuscles = ["Triceps", "Chest"];
    const secondaryMuscles = ["Shoulders", "Core"];
    const benefits = [
        "Upper Body Strength",
        "Upper Body Mass",
        "Joints Healths",
    ];
    return (
        <div className="flex flex-col items-center justify-center w-[280px] h-[400px] sm:h-fit absolute bg-white border-[4px] border-[#D30C7B] [transform:rotateY(180deg)] [backface-visibility:hidden] p-[16px] gap-[16px]">
            <div
                className={`w-full h-fit flex flex-col gap-[12px] justify-start items-center `}
            >
                <div
                    className={`w-full h-fit ${montserrat.className} font-[500] text-[20px] sm:text-[14px] text-center text-black`}
                >
                    Muscles Worked
                </div>
                <div
                    className={`w-full h-fit flex flex-wrap items-center justify-center gap-[8px] sm:[4px]`}
                >
                    {[...primaryMuscles, ...secondaryMuscles].map((m, i) => (
                        <div
                            key={i}
                            style={{
                                background:
                                    i < primaryMuscles.length
                                        ? "#D30C7B"
                                        : "#1CBAC8",
                            }}
                            className={`w-fit h-fit gap-[10px] px-[16px] py-[4px] flex rounded-full`}
                        >
                            <div
                                className={`w-fit h-fit ${montserrat.className} text-[18px] sm:text-[12px] font-[600] text-center text-white`}
                            >
                                {m}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={`w-full h-fit flex flex-col gap-[12px] justify-start items-center `}
            >
                <div
                    className={`w-full h-fit ${montserrat.className} font-[500] text-[20px] sm:text-[14px] text-center text-black`}
                >
                    Benefits
                </div>
                <div
                    className={`w-full h-fit flex flex-wrap items-center justify-center gap-[8px] sm:gap-[4px]`}
                >
                    {benefits.map((b, i) => (
                        <div
                            key={i}
                            className={`w-fit h-fit bg-[#35D648] gap-[10px] px-[16px] py-[4px] flex rounded-full`}
                        >
                            <div
                                className={`w-fit h-fit ${montserrat.className} text-[16px] sm:text-[12px] font-[600] text-center text-white`}
                            >
                                {b}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
function SlideButton({ direction }: { direction: "left" | "right" }) {
    return (
        <div
            style={{
                padding: `0 ${direction === "right" ? "64px" : 0} 0 ${direction === "left" ? "64px" : 0}`,
            }}
            className={`relative w-fit flex justify-center sm:w-[64px] h-[400px] sm:h-full bg-white z-[9999]`}
        >
            <div
                className={`bg-[#D30C7B] border border-x-[2px] border-y-0 border-white relative z-[10]
                        w-fit h-full gap-[8px] px-[4px]
                        flex flex-row items-center justify-center 
                        sm:bg-white sm:border-[#D30C7B] `}
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
        </div>
    );
}
