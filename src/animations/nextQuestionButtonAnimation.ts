import { animate } from "@/general-utils/app-routes";

export const showNextQuestionButton = () => {
    animate("#next-button-space-filler", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: {},
        toStyles: { height: "120px" },
    });
    animate("#next-button", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: {},
        toStyles: { bottom: "0px" },
    });
};

export const hideNextQuestionButton = () => {
    animate("#next-button-space-filler", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: {},
        toStyles: { height: "0px" },
    });
    animate("#next-button", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: {},
        toStyles: { bottom: "-120px" },
    });
};
