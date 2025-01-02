import { animate } from "@/general-utils/app-routes";

export const showNextQuestionButton = () => {
    animate("#next-button", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { height: "0px" },
        toStyles: { height: "60px" },
    });
};

export const hideNextQuestionButton = () => {
    animate("#next-button", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { height: "60px" },
        toStyles: { height: "0px" },
    });
};
