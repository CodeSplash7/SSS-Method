import ExercisesPreview from "@/components/ExercisesPreview";
import Navbar from "@/components/Navbar";
import PathToMastery from "@/components/PathToMastery";
import TrainingEssentials from "@/components/TrainingEssentials";
import TrainingProgram from "@/components/TrainingProgram";

export default function AssessmentPage() {
    return (
        <div
            className={`flex w-full h-fit flex-col justify-start items-center `}
        >
            <Navbar />
            <div
                className={`bg-white w-full h-fit
                        flex flex-col justify-start items-center
                        gap-[64px] md:gap-[96px] lg:gap-[128px]`}
            >
                <ExercisesPreview />
                <PathToMastery />
                <TrainingEssentials />
                <TrainingProgram />
            </div>
        </div>
    );
}
