import { animate } from "@/general-utils/app-routes";

export const showNextQuestionButton = () => {
    animate("#next-button", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { flexBasis: "0px" },
        toStyles: { flexBasis: "80px" },
    });
};

export const hideNextQuestionButton = () => {
    animate("#next-button", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { flexBasis: "80px" },
        toStyles: { flexBasis: "0px" },
    });
};
