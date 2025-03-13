"use client";

import { animate } from "@/general-utils/app-routes";
import { useState, useRef } from "react";

export default function PowerLevelForm() {
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
            fromStyles: { fontSize: "0.9rem" }, // Reduced margin and font size
            toStyles: { fontSize: "0.675rem" }, // Adjusted font size for consistency
        });
    };

    return (
        <div className="z-30 w-full h-screen flex flex-col justify-start items-center">
            <div
                className="w-[412.5px] h-[225px] relative top-[10px] bg-[#111111] max-w-[90%] flex flex-col p-[12px] justify-between items-center rounded-[10.5px]"
                style={{
                    padding: `12px`, // Reduced padding
                }}
            >
                <div className="font-bold text-[22.5px] text-[#1cbac8] text-center rounded-full px-[24px] py-[9px]">
                    Power Level Form
                </div>
                <div
                    id="form-card"
                    onClick={() => animateScaleDown()}
                    className="absolute z-[10] top-[75px] bg-white w-[375px] h-[450px] py-[18px] px-[36px] gap-[12px] flex flex-col items-center justify-start rounded-[15px] text-black text-[22.5px] font-bold"
                >
                    {/* Progress Bar */}
                    <div
                        id="progress-bar"
                        className="w-full h-[12px] bg-[#e7e5e5] rounded-[3px] text-[7.5px]"
                    >
                        <div className="min-h-[3px] h-full w-1/3 bg-[#d30c7b] flex items-center justify-center text-white font-bold">
                            1/3
                        </div>
                    </div>

                    <div
                        id="question"
                        className="text-[#343a40] text-[22.5px] h-fit text-center font-bold mt-[12px]"
                        style={{
                            fontSize: `22.5px`, // Reduced font size
                            marginTop: `12px`, // Reduced margin
                        }}
                    >
                        What is your level at pullups?
                    </div>

                    <div
                        id="options"
                        className="flex flex-col justify-start gap-[9px] h-fit w-full text-[0.9rem] mt-[45px] overflow-y-scroll"
                    >
                        {new Array(6).fill(0).map((_, index) => (
                            <div
                                key={index}
                                className="option bg-[#e9ecef] rounded-[6px] h-fit flex justify-between items-center px-[9px] py-[12px]"
                            >
                                <div className="flex text-[#062f33] gap-[3px]">
                                    <div>🔧</div>
                                    <div>Response</div>
                                </div>

                                <div className="text-[#6b6868]">Detail</div>
                            </div>
                        ))}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}
