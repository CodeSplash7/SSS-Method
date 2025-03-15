import QuestionnaireOptions from "./QuestionnaireOptions";
import QuestionStatement from "./QuestionStatement";

export default function QuestionPrompt({
    isSameRoute,
}: {
    isSameRoute: boolean;
}) {
    return (
        <div
            id="form-content"
            className="relative translate-x-[0%] flex flex-col w-full h-full overflow-hidden items-center justify-start gap-[16px]"
        >
            <div
                id="question"
                className="text-[#343a40] text-[22.5px] h-fit flex text-start gap-[16px] font-bold mt-[12px] px-[16px]"
                style={{
                    fontSize: `22.5px`,
                    marginTop: `12px`,
                }}
            >
                <QuestionStatement />
            </div>
            <QuestionnaireOptions isSameRoute={isSameRoute} />
        </div>
    );
}
