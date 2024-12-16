const ProgressionStep = () => (
  <div className="z-30 w-screen h-screen bg-[#1cbac875] flex justify-center items-center">
    <div className="w-[600px] scale-75 bg-white flex flex-col p-[48px] justify-start items-center gap-[32px] rounded-[14px]">
      <div className="bg-red-500 text-white font-bold text-[20px] text-center rounded-full px-[32px] py-[12px]">
        ONE MORE STEP!
      </div>
      <div className="flex flex-col text-[#6741d9] text-[40px] items-center">
        <div>Progression Level From</div>
        <div className="font-bold">REQUIRED</div>
      </div>
      <div className="w-2/3 text-center text-[18px]">
        How can I give you the best training plan without knowing your level?
      </div>
      <br />
      <div className="bg-[#1cbac8] text-white px-[48px] py-[24px] text-[30px] font-bold">
        FILL FORM 🗿
      </div>
    </div>
  </div>
);

export default ProgressionStep;
