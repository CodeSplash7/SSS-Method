"use client";

import {
    condenseFormAnimation,
    spreadOutFormAnimation,
} from "@/animations/formScaleAnimation";
import useUrl from "@/hooks/useUrl";
import { useEffect, useState } from "react";

const ScaleFormOnScrollAnimationHandler = () => {
    const [URL] = useUrl();
    const [isCondensed, setIsCondensed] = useState(true);

    useEffect(() => {
        const options = document.getElementById("options");
        if (!options) return;

        if (!isCondensed) {
            condenseFormAnimation();
            setIsCondensed(true);
        }

        const handleScroll = () => {
            spreadOutFormAnimation();

            setIsCondensed(false);
            options.removeEventListener("scroll", handleScroll);
        };

        options.addEventListener("scroll", handleScroll);

        return () => options.removeEventListener("scroll", handleScroll);
    }, [URL.queryParams.questionIndex]);
    // useEffect(() => {
    //     const options = document.getElementById("options");
    //     if (!options) return;

    //     const handleScroll = () => {
    //         condenseFormAnimation();

    //         setIsCondensed(true);
    //         options.removeEventListener("scroll", handleScroll);
    //     };

    //     options.addEventListener("scroll", handleScroll);

    //     return () => options.removeEventListener("scroll", handleScroll);
    // }, []);
    return <></>;
};
export default ScaleFormOnScrollAnimationHandler;
