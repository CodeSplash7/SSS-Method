"use client";
import { Montserrat } from "next/font/google";
import { useState } from "react";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["500", "600"],
    style: ["italic", "normal"],
});

export default function TrainingProgram() {
    return (
        <div
            className={`w-full h-fit gap-[16px] p-[16px_32px]
                        flex flex-col items-center justify-center bg-white 
                        sm:gap-[32px] sm:p-[32px] `}
        >
            <TitleBar />
            <Schedule />
        </div>
    );
}

const TitleBar = () => (
    <div
        className={`w-full h-fit gap-[8px]
                    flex flex-row flex-wrap items-center justify-start
                    sm:flex-nowrap
                    2xl:gap-[16px]
                    `}
    >
        <Title />
        <HeaderActions />
    </div>
);

const Title = () => (
    <div
        className={`w-full h-fit gap-[32px]
                    flex flex-row items-start justify-start
                    md:w-fit`}
    >
        <div
            className={`w-full h-fit sm:whitespace-nowrap
                        ${montserrat.className} text-[16px] text-black font-[500] italic
                        sm:text-[24px]`}
        >
            Train Smarter, Recover Better
        </div>
    </div>
);

const HeaderActions = () => (
    <div
        className={`w-full h-fit gap-y-[16px]
                    flex flex-row flex-wrap sm:flex-nowrap items-center justify-between`}
    >
        <ScheduleBadge />
        <ModifyPlanButton />
    </div>
);

const ScheduleBadge = () => {
    type Stage = "custom" | "efficient" | "accessible";
    const [buttonStage, setButtonStage] = useState<Stage>("custom");

    const stageProps: Record<Stage, { text: string; d: string }> = {
        custom: {
            text: "Custom",
            d: "M1.55556 12.7213H2.66389L10.2667 5.11852L9.15833 4.01019L1.55556 11.613V12.7213ZM0 14.2769V10.9713L10.2667 0.724078C10.4222 0.581485 10.594 0.4713 10.7819 0.393522C10.9699 0.315744 11.1676 0.276855 11.375 0.276855C11.5824 0.276855 11.7833 0.315744 11.9778 0.393522C12.1722 0.4713 12.3407 0.587967 12.4833 0.743522L13.5528 1.83241C13.7083 1.975 13.8218 2.14352 13.8931 2.33797C13.9644 2.53241 14 2.72686 14 2.9213C14 3.12871 13.9644 3.32639 13.8931 3.51436C13.8218 3.70232 13.7083 3.87408 13.5528 4.02963L3.30556 14.2769H0ZM9.70278 4.57408L9.15833 4.01019L10.2667 5.11852L9.70278 4.57408Z",
        },
        efficient: {
            text: "Most Efficient",
            d: "M3.11111 14V12.4444H6.22222V10.0333C5.58704 9.89074 5.01991 9.62176 4.52083 9.22639C4.02176 8.83102 3.65556 8.33519 3.42222 7.73889C2.45 7.62222 1.63657 7.19769 0.981944 6.46528C0.327315 5.73287 0 4.87407 0 3.88889V3.11111C0 2.68333 0.152315 2.31713 0.456944 2.0125C0.761574 1.70787 1.12778 1.55556 1.55556 1.55556H3.11111V0H10.8889V1.55556H12.4444C12.8722 1.55556 13.2384 1.70787 13.5431 2.0125C13.8477 2.31713 14 2.68333 14 3.11111V3.88889C14 4.87407 13.6727 5.73287 13.0181 6.46528C12.3634 7.19769 11.55 7.62222 10.5778 7.73889C10.3444 8.33519 9.97824 8.83102 9.47917 9.22639C8.98009 9.62176 8.41296 9.89074 7.77778 10.0333V12.4444H10.8889V14H3.11111ZM3.11111 6.06667V3.11111H1.55556V3.88889C1.55556 4.38148 1.69815 4.82546 1.98333 5.22083C2.26852 5.6162 2.64444 5.89815 3.11111 6.06667ZM7 8.55556C7.64815 8.55556 8.19907 8.3287 8.65278 7.875C9.10648 7.4213 9.33333 6.87037 9.33333 6.22222V1.55556H4.66667V6.22222C4.66667 6.87037 4.89352 7.4213 5.34722 7.875C5.80093 8.3287 6.35185 8.55556 7 8.55556ZM10.8889 6.06667C11.3556 5.89815 11.7315 5.6162 12.0167 5.22083C12.3019 4.82546 12.4444 4.38148 12.4444 3.88889V3.11111H10.8889V6.06667Z",
        },
        accessible: {
            text: "Most Accessible",
            d: "M1.55556 14C1.12779 14 0.76158 13.8629 0.456941 13.5887C0.152316 13.3145 0 12.9849 0 12.6V2.79999C0 2.41499 0.152316 2.0854 0.456941 1.81124C0.76158 1.53708 1.12779 1.39999 1.55556 1.39999H2.33335V0H3.8889V1.39999H10.1111V0H11.6667V1.39999H12.4444C12.8722 1.39999 13.2385 1.53708 13.5431 1.81124C13.8477 2.0854 14 2.41499 14 2.79999V12.6C14 12.9849 13.8477 13.3145 13.5431 13.5887C13.2385 13.8629 12.8722 14 12.4444 14H1.55556ZM1.55556 12.6H12.4444V5.59998H1.55556V12.6ZM1.55556 4.19999H12.4444V2.79999H1.55556V4.19999Z",
        },
    };
    return (
        <div
            className={`w-fit h-fit gap-[4px] px-[8px] py-[6px]
                    flex items-center justify-center 
                    bg-[#D30C7B] rounded-full
                    sm:px-[12px] sm:py-[8px]`}
        >
            <svg
                className={`w-[10px] h-[10px] sm:w-[14px] sm:h-[14px]`}
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={stageProps[buttonStage].d} fill="white" />
            </svg>

            <div
                className={`w-fit h-fit 
                        ${montserrat.className} font-[600] text-[6px] text-white text-center
                        sm:text-[10px] `}
            >
                {stageProps[buttonStage].text}
            </div>
        </div>
    );
};

const ModifyPlanButton = () => {
    type Stage = "idle" | "hover" | "save";
    const [buttonStage, setButtonStage] = useState<Stage>("idle");

    const stageProps: Record<
        Stage,
        {
            text: string;
            d: string;
            iconColor: string;
            buttonColor: string;
        }
    > = {
        idle: {
            text: "Modify Your Plan",
            d: "M8.54 13.6L10.82 11.34L8.54 9.08L7.7 9.92L8.56 10.78C8.18667 10.7933 7.82333 10.7333 7.47 10.6C7.11667 10.4667 6.8 10.26 6.52 9.98C6.25333 9.71333 6.05 9.40667 5.91 9.06C5.77 8.71333 5.7 8.36667 5.7 8.02C5.7 7.79333 5.73 7.56667 5.79 7.34C5.85 7.11333 5.93333 6.89333 6.04 6.68L5.16 5.8C4.93333 6.13333 4.76667 6.48667 4.66 6.86C4.55333 7.23333 4.5 7.61333 4.5 8C4.5 8.50667 4.6 9.00667 4.8 9.5C5 9.99333 5.29333 10.4333 5.68 10.82C6.06667 11.2067 6.5 11.4967 6.98 11.69C7.46 11.8833 7.95333 11.9867 8.46 12L7.7 12.76L8.54 13.6ZM11.84 10.2C12.0667 9.86667 12.2333 9.51333 12.34 9.14C12.4467 8.76667 12.5 8.38667 12.5 8C12.5 7.49333 12.4033 6.99 12.21 6.49C12.0167 5.99 11.7267 5.54667 11.34 5.16C10.9533 4.77333 10.5167 4.48667 10.03 4.3C9.54333 4.11333 9.04667 4.02 8.54 4.02L9.3 3.24L8.46 2.4L6.18 4.66L8.46 6.92L9.3 6.08L8.42 5.2C8.78 5.2 9.14667 5.27 9.52 5.41C9.89333 5.55 10.2133 5.75333 10.48 6.02C10.7467 6.28667 10.95 6.59333 11.09 6.94C11.23 7.28667 11.3 7.63333 11.3 7.98C11.3 8.20667 11.27 8.43333 11.21 8.66C11.15 8.88667 11.0667 9.10667 10.96 9.32L11.84 10.2ZM8.5 16C7.39333 16 6.35333 15.79 5.38 15.37C4.40667 14.95 3.56 14.38 2.84 13.66C2.12 12.94 1.55 12.0933 1.13 11.12C0.71 10.1467 0.5 9.10667 0.5 8C0.5 6.89333 0.71 5.85333 1.13 4.88C1.55 3.90667 2.12 3.06 2.84 2.34C3.56 1.62 4.40667 1.05 5.38 0.63C6.35333 0.21 7.39333 0 8.5 0C9.60667 0 10.6467 0.21 11.62 0.63C12.5933 1.05 13.44 1.62 14.16 2.34C14.88 3.06 15.45 3.90667 15.87 4.88C16.29 5.85333 16.5 6.89333 16.5 8C16.5 9.10667 16.29 10.1467 15.87 11.12C15.45 12.0933 14.88 12.94 14.16 13.66C13.44 14.38 12.5933 14.95 11.62 15.37C10.6467 15.79 9.60667 16 8.5 16Z",
            iconColor: "#1CBAC8",
            buttonColor: "transparent",
        },
        hover: {
            text: "Modify Your Plan",
            d: "M8.54 13.6L10.82 11.34L8.54 9.08L7.7 9.92L8.56 10.78C8.18667 10.7933 7.82333 10.7333 7.47 10.6C7.11667 10.4667 6.8 10.26 6.52 9.98C6.25333 9.71333 6.05 9.40667 5.91 9.06C5.77 8.71333 5.7 8.36667 5.7 8.02C5.7 7.79333 5.73 7.56667 5.79 7.34C5.85 7.11333 5.93333 6.89333 6.04 6.68L5.16 5.8C4.93333 6.13333 4.76667 6.48667 4.66 6.86C4.55333 7.23333 4.5 7.61333 4.5 8C4.5 8.50667 4.6 9.00667 4.8 9.5C5 9.99333 5.29333 10.4333 5.68 10.82C6.06667 11.2067 6.5 11.4967 6.98 11.69C7.46 11.8833 7.95333 11.9867 8.46 12L7.7 12.76L8.54 13.6ZM11.84 10.2C12.0667 9.86667 12.2333 9.51333 12.34 9.14C12.4467 8.76667 12.5 8.38667 12.5 8C12.5 7.49333 12.4033 6.99 12.21 6.49C12.0167 5.99 11.7267 5.54667 11.34 5.16C10.9533 4.77333 10.5167 4.48667 10.03 4.3C9.54333 4.11333 9.04667 4.02 8.54 4.02L9.3 3.24L8.46 2.4L6.18 4.66L8.46 6.92L9.3 6.08L8.42 5.2C8.78 5.2 9.14667 5.27 9.52 5.41C9.89333 5.55 10.2133 5.75333 10.48 6.02C10.7467 6.28667 10.95 6.59333 11.09 6.94C11.23 7.28667 11.3 7.63333 11.3 7.98C11.3 8.20667 11.27 8.43333 11.21 8.66C11.15 8.88667 11.0667 9.10667 10.96 9.32L11.84 10.2ZM8.5 16C7.39333 16 6.35333 15.79 5.38 15.37C4.40667 14.95 3.56 14.38 2.84 13.66C2.12 12.94 1.55 12.0933 1.13 11.12C0.71 10.1467 0.5 9.10667 0.5 8C0.5 6.89333 0.71 5.85333 1.13 4.88C1.55 3.90667 2.12 3.06 2.84 2.34C3.56 1.62 4.40667 1.05 5.38 0.63C6.35333 0.21 7.39333 0 8.5 0C9.60667 0 10.6467 0.21 11.62 0.63C12.5933 1.05 13.44 1.62 14.16 2.34C14.88 3.06 15.45 3.90667 15.87 4.88C16.29 5.85333 16.5 6.89333 16.5 8C16.5 9.10667 16.29 10.1467 15.87 11.12C15.45 12.0933 14.88 12.94 14.16 13.66C13.44 14.38 12.5933 14.95 11.62 15.37C10.6467 15.79 9.60667 16 8.5 16Z",
            iconColor: "white",
            buttonColor: "#1CBAC8",
        },
        save: {
            text: "Save Changes",
            d: "M6.88 11.68L12.52 6.04L11.4 4.92L6.88 9.44L4.6 7.16L3.48 8.28L6.88 11.68ZM8 16C6.89333 16 5.85333 15.79 4.88 15.37C3.90667 14.95 3.06 14.38 2.34 13.66C1.62 12.94 1.05 12.0933 0.63 11.12C0.21 10.1467 0 9.10667 0 8C0 6.89333 0.21 5.85333 0.63 4.88C1.05 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.05 4.88 0.63C5.85333 0.21 6.89333 0 8 0C9.10667 0 10.1467 0.21 11.12 0.63C12.0933 1.05 12.94 1.62 13.66 2.34C14.38 3.06 14.95 3.90667 15.37 4.88C15.79 5.85333 16 6.89333 16 8C16 9.10667 15.79 10.1467 15.37 11.12C14.95 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.95 11.12 15.37C10.1467 15.79 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z",
            buttonColor: "transparent",
            iconColor: "#35D648",
        },
    };
    return (
        <div
            style={{
                background: stageProps[buttonStage].buttonColor,
                borderColor: stageProps[buttonStage].iconColor,
            }}
            className={`w-fit h-fit 
                flex flex-row items-center justify-center 
                gap-[8px] p-[8px] rounded-[8px] border
                sm:gap-[10px] sm:rounded-[12px]`}
        >
            <svg
                className={`w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]`}
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d={stageProps[buttonStage].d}
                    fill={stageProps[buttonStage].iconColor}
                />
            </svg>
            <div
                style={{ color: stageProps[buttonStage].iconColor }}
                className={`w-fit h-fit ${montserrat.className} font-[600] text-[8px] text-center sm:text-[10px]`}
            >
                {stageProps[buttonStage].text}
            </div>
        </div>
    );
};

const Schedule = () => {
    const schedule: ("push" | "pull" | "legs" | "rest")[] = [
        "push",
        "pull",
        "legs",
        "rest",
        "push",
        "pull",
    ];
    return (
        <div
            className={`w-full sm:w-full h-fit overflow-x-scroll
                        flex sm:flex-wrap justify-start items-center gap-[16px] pt-[16px]`}
        >
            {schedule.map((trainDay, index) => (
                <TrainDayCard key={index} trainDay={trainDay} />
            ))}
        </div>
    );
};

const TrainDayCard = ({
    trainDay,
    cardSize = "big",
}: {
    trainDay: "push" | "pull" | "legs" | "rest";
    cardSize?: "big" | "small";
}) => {
    type Size = "small" | "big";
    const [size] = useState<Size>(cardSize);

    const stageProps: Record<
        Size,
        {
            width: number;
            height: number;
            labelHeight: number;
        }
    > = {
        small: { width: 67, height: 96, labelHeight: 20 },
        big: { width: 92, height: 140, labelHeight: 26 },
    };

    return (
        <div
            style={{ minWidth: stageProps[size].width }}
            className={`h-fit
                        flex flex-col justify-start items-center gap-[8px] `}
        >
            <div
                className={`w-fit h-fit 
                            ${montserrat.className} font-[600] text-[12px] text-center text-black`}
            >
                Monday
            </div>

            <div
                style={{ height: stageProps[size].height }}
                className={`w-full flex flex-col items-start justify-start rounded-t-[16px]`}
            >
                <div
                    className={`w-full h-full
                                flex flex-col items-start justify-start
                                gap-[10px] p-[10px] rounded-t-[16px] bg-[rgb(0,0,0,.85)]`}
                ></div>
                <div
                    style={{
                        height: stageProps[size].labelHeight,
                        background: trainDay === "rest" ? "#1CBAC8" : "#D30C7B",
                    }}
                    className={`w-full h-full flex flex-col justify-center 
                                capitalize ${montserrat.className} font-[600] text-white text-center text-[10px]`}
                >
                    {trainDay}
                </div>
            </div>
        </div>
    );
};
