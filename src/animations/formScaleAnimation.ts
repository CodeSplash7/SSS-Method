import { animate } from "@/general-utils/app-routes";

const scaleDownFormAnimation = async () => {
    animate("#progress-bar", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { height: "12px", fontSize: 7.5 },
        toStyles: { height: "6px", fontSize: 0 },
    });

    animate("#form-card", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { padding: "18px 36px" },
        toStyles: { padding: "9px 36px" },
    });

    animate("#question", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { fontSize: "22.5px", marginTop: "12px" },
        toStyles: { fontSize: "15px", marginTop: "0px" },
    });

    animate("#options", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { fontSize: "0.9rem", marginTop: "40px" },
        toStyles: { marginTop: "0px" },
    });
};

const scaleUpFormAnimation = async () => {
    animate("#progress-bar", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { height: "6px", fontSize: 0 },
        toStyles: { height: "12px", fontSize: 7.5 },
    });

    animate("#form-card", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { padding: "9px 36px" },
        toStyles: { padding: "18px 36px" },
    });

    animate("#question", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { fontSize: "15px", marginTop: "0px" },
        toStyles: { fontSize: "22.5px", marginTop: "12px" },
    });

    animate("#options", {
        duration: 0.5,
        easeFunc: "ease",
        fromStyles: { marginTop: "0px" },
        toStyles: { fontSize: "0.9rem", marginTop: "40px" },
    });
};

export { scaleDownFormAnimation, scaleUpFormAnimation };
