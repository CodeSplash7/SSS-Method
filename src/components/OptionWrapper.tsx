"use client";

import { animate } from "@/general-utils/app-routes";
import parseUrl from "@/general-utils/parse-url";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

export default function OptionWrapper({
    children,
    optionIndex,
}: {
    children: React.ReactNode;
    optionIndex: number;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [urlObject, setUrlObject] = useState(parseUrl(window.location.href));
    useEffect(() => {
        setUrlObject(parseUrl(window.location.href));
    }, [searchParams.toString()]);

    const handleAnimation = async () => {
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
                left: `0%`,
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

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        handleAnimation();

        const optionElement = (e.target as HTMLDivElement).closest(
            "div[data-index]",
        ) as HTMLDivElement;
        if (!optionElement) return;

        const selectedOptionIndex = optionElement.dataset.index;

        const updatedUrlObject = { ...urlObject };
        updatedUrlObject.queryParams.answers =
            updatedUrlObject.queryParams.answers || "";

        updatedUrlObject.queryParams.answers += String(selectedOptionIndex);

        setUrlObject(updatedUrlObject);
        router.push(updatedUrlObject.toString());
    };
    return (
        <div
            id={`option${optionIndex}`}
            data-index={String(optionIndex)}
            className="option relative font-[400] overflow-hidden text-[#062f33] hover:bg-white bg-[#e9ecef] border border-[2px] transition duration-150 hover:border-[#1cbac8] border-transparent rounded-[6px] h-fit flex justify-between items-center px-[9px] py-[12px]"
            onClick={handleClick}
        >
            {children}
        </div>
    );
}
