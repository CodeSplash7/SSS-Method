"use client";

import { animate } from "@/general-utils/app-routes";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProgressionStep = () => {
  const [title, setTitle] = useState("⚠️ONE MORE STEP!⚠️");
  const router = useRouter();
  const transformBgBlock = async () => {
    const previousBgElement = document.getElementById("previous-bg-element");
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
        // top: "7.5px",
        borderRadius: "10.5px",
        width: "375px",
        height: "450px",
        paddingTop: "36px",
      },
      toStyles: {
        backgroundColor: "#111111",
        // top: "10px",
        width: "412.5px",
        height: "225px",
        paddingTop: "12px",
      },
    });

    setTitle("Power Level Form");
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
      id="previous-bg-element"
      className="w-[375px] relative top-[10px] max-w-[90%] h-[450px] bg-white flex flex-col p-[36px] justify-between items-center rounded-[10.5px]"
    >
      <div
        id="title"
        className="child font-bold text-[22.5px] text-[#d30c7b] text-center rounded-full px-[24px] py-[9px]"
      >
        {title}
      </div>

      <div className="child text-center text-[#062f33] font-[1000] text-[34.5px]">
        Power level form ⚡REQUIRED⚡
      </div>

      <div className="child w-full text-center text-[15px]">
        How can I give you the best training plan without knowing your level?{" "}
        <br />
        🗿
      </div>

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
      <div className="child z-[1] bg-[#1cbac8] w-[262.5px] h-[60px] flex items-center justify-center rounded-[15px] text-white text-[22.5px] font-bold"></div>
    </div>
  );
};
export default ProgressionStep;
