"use client";

import {
    scaleDownFormAnimation,
    scaleUpFormAnimation,
} from "@/animations/formScaleAnimation";
import useUrl from "@/hooks/useUrl";
import { useEffect, useRef, useState } from "react";

const ScaleFormOnScrollAnimationHandler = () => {
    const [URL] = useUrl();
    const [isScaledDown, setIsScaledDown] = useState(false);

    useEffect(() => {
        if (isScaledDown === false) return;
        scaleUpFormAnimation();
        setIsScaledDown(false);
    }, [URL]);
    useEffect(() => {
        const options = document.getElementById("options");
        if (!options) return;

        const handleScroll = () => {
            scaleDownFormAnimation();
            setIsScaledDown(true);
            options.removeEventListener("scroll", handleScroll);
        };

        options.addEventListener("scroll", handleScroll);

        return () => options.removeEventListener("scroll", handleScroll);
    }, []);
    return <></>;
};
export default ScaleFormOnScrollAnimationHandler;
