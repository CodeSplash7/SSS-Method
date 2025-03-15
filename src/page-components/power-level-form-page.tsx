// components
import ProgressBar from "@/components/ProgressBar";
import QuestionPrompt from "@/components/QuestionPrompt";
// animation handlers
import ScaleFormOnScrollAnimationHandler from "@/components/ScaleFormOnScrollAnimationHandler";
import Questionnaire from "@/general-utils/Questionnaire";
// hooks
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function PowerLevelFormPage({

    searchParams,
    params,
}: {
    params: Record<symbol, any>;
    searchParams: { questionIndex: string; answers: string };
}) {
    const currentRoute = params[Object.getOwnPropertySymbols(params)[7]].route;
    const isSameRoute =
        currentRoute === (await cookies()).get("previousPath")?.value;

    return (
        <div className="z-30 w-full h-screen flex flex-col justify-start items-center">
            <ScaleFormOnScrollAnimationHandler />
            <div
                className="w-[412.5px] h-[225px] relative top-[10px] bg-[#111111] max-w-[90%] flex flex-col p-[12px] justify-between items-center rounded-[10.5px]"
                style={{
                    padding: `12px`,
                }}
            >
                {/* Form title*/}
                <div className="font-bold text-[22.5px] text-[#1cbac8] text-center rounded-full px-[24px] py-[9px]">
                    Power Level Form
                </div>

                <div
                    id="form-card"
                    className="absolute overflow-hidden z-[10] top-[75px] bg-white w-[375px] h-[450px] py-[18px] px-[36px] gap-[12px] flex flex-col items-center justify-start rounded-[15px] text-black text-[22.5px] font-bold"
                >
                    <ProgressBar
                        questionIndex={Number(searchParams.questionIndex)}
                    />
                    <QuestionPrompt isSameRoute={isSameRoute} />
                </div>
            </div>
        </div>
    );
}
