import { animate } from "@/general-utils/app-routes";

const SLIDE_DURATION = 0.7;

export const slideOut = async () => {
    await animate("#form-content", {
        duration: SLIDE_DURATION,
        easeFunc: "back.out",
        fromStyles: { transform: "translateX(0%)" },
        toStyles: { transform: "translateX(-120%)" },
    });
};

export const slideIn = async () => {
    await animate("#form-content", {
        duration: SLIDE_DURATION,
        easeFunc: "back.out",
        fromStyles: { transform: "translateX(120%)" },
        toStyles: { transform: "translateX(0%)" },
    });
};
