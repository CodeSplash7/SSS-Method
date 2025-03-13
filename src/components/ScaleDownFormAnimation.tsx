"use client";

import { animate } from "@/general-utils/app-routes";
<<<<<<< HEAD
import { useEffect } from "react";

const ScaleDownFormAnimation = ({ formId }: { formId: string }) => {
=======
import { useEffect, useRef } from "react";

const ScaleDownFormAnimation = () => {
>>>>>>> b654e7968376c633880115d05aa9946cb3429512
    useEffect(() => {
        const animateScaleDown = async () => {
            animate("#progress-bar", {
                duration: 0.5,
                easeFunc: "ease",
                fromStyles: { height: "12px", fontSize: 7.5 }, // Reduced height and font size by 25%
                toStyles: { height: "6px", fontSize: 0 }, // Reduced height to 75% of original
            });

            animate("#form-card", {
                duration: 0.5,
                easeFunc: "ease",
                fromStyles: { padding: "18px 36px" }, // Reduced padding by 25%
                toStyles: { padding: "9px 36px" }, // Adjusted padding to reflect scale
            });

            animate("#question", {
                duration: 0.5,
                easeFunc: "ease",
                fromStyles: { fontSize: "22.5px", marginTop: "12px" }, // Reduced font size and margin
                toStyles: { fontSize: "15px", marginTop: "0px" }, // Reduced target values
            });

            animate("#options", {
                duration: 0.5,
                easeFunc: "ease",
<<<<<<< HEAD
                fromStyles: { fontSize: "0.9rem" }, // Reduced margin and font size
                toStyles: { fontSize: "0.675rem" }, // Adjusted font size for consistency
            });
        };
        const formElement = document.getElementById(formId);
        if (!formElement) return;

        formElement.addEventListener("click", animateScaleDown);

        return () => formElement.removeEventListener("click", animateScaleDown);
    }, [formId]);
=======
                fromStyles: { fontSize: "0.9rem", marginTop: "40px" }, // Reduced margin and font size
                toStyles: { fontSize: "0.675rem", marginTop: "0px" }, // Adjusted font size for consistency
            });
        };

        const options = document.getElementById("options");
        if (!options) return;

        const handleScroll = () => {
            animateScaleDown();
            options.removeEventListener("scroll", handleScroll);
        };

        options.addEventListener("scroll", handleScroll);

        return () => options.removeEventListener("scroll", handleScroll);
    }, []);
>>>>>>> b654e7968376c633880115d05aa9946cb3429512
    return <></>;
};
export default ScaleDownFormAnimation;
