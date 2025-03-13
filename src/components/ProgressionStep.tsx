<<<<<<< HEAD
import CardToFormButton from "@/general-utils/CardToFromButton";
=======
import CardToFormButton from "@/components/CardToFormButton";
>>>>>>> b654e7968376c633880115d05aa9946cb3429512

const ProgressionStep = () => {
  return (
    <div
      id="previous-bg-element"
      className="w-[375px] relative top-[10px] max-w-[90%] h-[450px] bg-white flex flex-col p-[36px] justify-between items-center rounded-[10.5px]"
    >
      <div
        id="title"
        className="child font-bold text-[22.5px] text-[#d30c7b] text-center rounded-full px-[24px] py-[9px]"
      >
        ⚠️ONE MORE STEP!⚠
      </div>

      <div className="child text-center text-[#062f33] font-[1000] text-[34.5px]">
        Power level form ⚡REQUIRED⚡
      </div>

      <div className="child w-full text-center text-[15px]">
        How can I give you the best training plan without knowing your level?{" "}
        <br />
        🗿
      </div>

      <div className="child z-[1] bg-[#1cbac8] w-[262.5px] h-[60px] flex items-center justify-center rounded-[15px] text-white text-[22.5px] font-bold"></div>
      <CardToFormButton />
    </div>
  );
};
export default ProgressionStep;
