import { animate } from "@/general-utils/app-routes";

const SLIDE_DURATION = 0.7;

export const slideOut = async (to: "left" | "right") => {
    await animate("#form-content", {
        duration: SLIDE_DURATION,
        easeFunc: "back.out",
        fromStyles: { transform: "translateX(0%)" },
        toStyles: { transform: `translateX(${to === "left" ? "-" : ""}120%)` },
    });
};

export const slideIn = async (from: "left" | "right") => {
    await animate("#form-content", {
        duration: SLIDE_DURATION,
        easeFunc: "back.out",
        fromStyles: {
            transform: `translateX(${from === "left" ? "-" : ""}120%)`,
        },
        toStyles: { transform: "translateX(0%)" },
    });
};
