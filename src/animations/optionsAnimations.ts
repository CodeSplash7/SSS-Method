import { animate } from "@/general-utils/app-routes";

export const handleSelectAnimation = async (optionIndex: number) => {
    animate(".option", {
        duration: 0.3,
        easeFunc: "ease",
        fromStyles: {},
        toStyles: {},
    });
    await animate(".option-detail", {
        duration: 0.3,
        easeFunc: "ease",
        fromStyles: { transform: "translateX(0%)" },
        toStyles: { transform: "translateX(120%)" },
    });
    animate(".option-detail", {
        duration: 0.3,
        easeFunc: "ease",
        fromStyles: { display: "block" },
        toStyles: { display: "none" },
    });
    animate(".option-response", {
        duration: 0.3,
        easeFunc: "ease",
        fromStyles: { left: "0%" },
        toStyles: {
            left: "50%",
            transform: "translateX(-50%)",
        },
    });
    animate(".hidden-emoji", {
        duration: 0.3,
        easeFunc: "ease",
        fromStyles: { left: "200%", opacity: "1" },
        toStyles: {
            left: "0%",
            opacity: "1",
        },
    });
    animate(`#option${optionIndex}`, {
        duration: 0.3,
        easeFunc: "ease",
        fromStyles: {
            background: "white",
            fontWeight: "400",
            color: "#062f33",
        },
        toStyles: {
            background: "#1cbac8",
            fontWeight: "600",
            color: "white",
        },
    });
};
export const handleDeselectAnimation = async (optionIndex: number) => {
    await Promise.all([
        animate(`#option${optionIndex}`, {
            duration: 0.3,
            easeFunc: "ease",
            fromStyles: {
                background: "#1cbac8",
                fontWeight: "600",
                color: "white",
            },
            toStyles: {
                background: "#e9ecef",
                fontWeight: "400",
                color: "#062f33",
            },
        }),
        animate(".hidden-emoji", {
            duration: 0.3,
            easeFunc: "ease",
            fromStyles: { left: "0%", opacity: "1" },
            toStyles: { left: "200%", opacity: "0" },
        }),
        animate(".option-response", {
            duration: 0.3,
            easeFunc: "ease",
            fromStyles: {
                left: "50%",
                transform: "translateX(-50%)",
            },
            toStyles: { left: "0%", transform: "translateX(0)" },
        }),
        animate(".option-detail", {
            duration: 0.3,
            easeFunc: "ease",
            fromStyles: { transform: "translateX(120%)" },
            toStyles: { transform: "translateX(0%)" },
        }),
    ]);
    await Promise.all([
        animate(".option-detail", {
            duration: 0.3,
            easeFunc: "ease",
            fromStyles: { transform: "translateX(120%)" },
            toStyles: { transform: "translateX(0%)" },
        }),
        animate(".option-detail", {
            duration: 0.3,
            easeFunc: "ease",
            fromStyles: { display: "none" },
            toStyles: { display: "block" },
        }),
    ]);
};
export const handlePartialDeselectAnimation = async (optionIndex: number) => {
    animate(`#option${optionIndex}`, {
        duration: 0.1,
        easeFunc: "ease",
        fromStyles: {
            background: "#1cbac8",
            fontWeight: "600",
            color: "white",
        },
        toStyles: {
            background: "#e9ecef",
            fontWeight: "400",
            color: "#062f33",
        },
    });
};
export const handlePartialSelectAnimation = async (optionIndex: number) => {
    animate(`#option${optionIndex}`, {
        duration: 0.1,
        easeFunc: "ease",
        fromStyles: {
            background: "#e9ecef",
            fontWeight: "400",
            color: "#062f33",
        },
        toStyles: {
            background: "#1cbac8",
            fontWeight: "600",
            color: "white",
        },
    });
};
