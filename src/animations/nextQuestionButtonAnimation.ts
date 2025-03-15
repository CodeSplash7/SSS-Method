import { animate } from "@/general-utils/app-routes";

export const showNextQuestionButton = () => {
    animate("#next-button-space-filler", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { height: "0px" },
        toStyles: { height: "60px" },
    });
    animate("#next-button", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { bottom: "-60px" },
        toStyles: { bottom: "0px" },
    });
};

export const hideNextQuestionButton = () => {
    animate("#next-button-space-filler", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { height: "60px" },
        toStyles: { height: "0px" },
    });
    animate("#next-button", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { bottom: "0px" },
        toStyles: { bottom: "-60px" },
    });
};
