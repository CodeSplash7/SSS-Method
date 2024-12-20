"use client";

import { useRouter } from "next/navigation";
import { animate } from "./app-routes";

export default function CardToFormButton() {
    const router = useRouter();
    const transformBgBlock = async () => {
        const previousBgElement = document.getElementById(
            "previous-bg-element",
        );
        if (!previousBgElement) return;

        const element = document.getElementById("button-to-form");
        if (!element) return;
        const rect = element.getBoundingClientRect();

        animate(".child", {
            duration: 0.4,
            easeFunc: "ease",
            fromStyles: { opacity: 1 },
            toStyles: { opacity: 0 },
        });

        animate("#previous-bg-element", {
            duration: 0.4,
            easeFunc: "ease",
            fromStyles: {
                backgroundColor: "#ffffff",
                borderRadius: "10.5px",
                width: "375px",
                height: "450px",
                paddingTop: "36px",
            },
            toStyles: {
                backgroundColor: "#111111",
                width: "412.5px",
                height: "225px",
                paddingTop: "12px",
            },
        });

        const title = document.getElementById("title");
        if (title) title.innerText = "Power Level Form";
        await animate("#title", {
            duration: 0.4,
            easeFunc: "ease",
            fromStyles: { color: "#1cbac8", opacity: 0 },
            toStyles: { opacity: 1 },
        });

        animate("#transformer-text", {
            duration: 0.4,
            easeFunc: "ease",
            fromStyles: { opacity: 1 },
            toStyles: { opacity: 0 },
        });

        animate("#button-to-form", {
            duration: 0.4,
            easeFunc: "ease",
            fromStyles: {
                backgroundColor: "#1cbac8",
                position: "absolute",
                bottom: `36px`,
            },
            toStyles: {
                backgroundColor: "white",
                top: "75px",
                position: "absolute",
            },
        });

        await animate("#transformer-text", {
            duration: 0.4,
            easeFunc: "ease",
            fromStyles: { display: "block" },
            toStyles: { display: "none" },
        });

        await animate("#button-to-form", {
            duration: 0.4,
            easeFunc: "ease",
            fromStyles: {
                width: `262.5px`,
            },
            toStyles: {
                width: "375px",
            },
        });

        await animate("#button-to-form", {
            duration: 0.4,
            easeFunc: "ease",
            fromStyles: {
                height: `60px`,
            },
            toStyles: {
                height: "450px",
            },
        });

        await animate("#hidden-form", {
            duration: 0.4,
            easeFunc: "ease",
            fromStyles: {
                display: "none",
                opacity: 0,
            },
            toStyles: { display: "flex", opacity: 1 },
        });
    };
    return (
        <div
            onClick={async () => {
                await transformBgBlock();
                router.push("power-level-form");
            }}
            id="button-to-form"
            className="absolute z-[10] bottom-[36px] bg-[#1cbac8] w-[262.5px] h-[60px] flex items-center justify-center rounded-[15px] text-white text-[22.5px] font-bold"
        >
            <div id="transformer-text">FILL FORM 📋</div>
            <div id="hidden-form" className="hidden opacity-0 text-black">
                <div className="scale-150 dot-spinner">
                    <div className="dot-spinner__dot black"></div>
                    <div className="dot-spinner__dot black"></div>
                    <div className="dot-spinner__dot black"></div>
                    <div className="dot-spinner__dot black"></div>
                    <div className="dot-spinner__dot black"></div>
                    <div className="dot-spinner__dot black"></div>
                    <div className="dot-spinner__dot black"></div>
                    <div className="dot-spinner__dot black"></div>
                </div>
            </div>
        </div>
    );
}
