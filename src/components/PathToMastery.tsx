import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
  style: ["italic", "normal"]
});

export default async function PathToMastery() {
  return (
    <div
      className={`w-full h-fit
                        flex flex-col items-center justify-center
                        px-[8px] py-[32px]
                        bg-gradient-to-r from-[#1CBAC8]/40 to-[#D30C7B]/40
                        sm:px-[32px] sm:py-[32px]`}
    >
      <Title />
      <Carousel />
      <Pagination />
    </div>
  );
}

const Title = () => (
  <div
    className={`w-[148px] h-fit
                            flex flex-row items-center justify-center gap-[2px]
                            sm:w-full sm:gap-[4px]`}
  >
    <div className="w-fit h-fit text-[16px] sm:text-[24px] ">🌟</div>
    <div
      className={`w-fill h-fit ${montserrat.className} font-[500] italic text-[16px] text-black sm:text-[24px]`}
    >
      Your Path to Mastery
    </div>
    <div className="w-fit h-fit text-[16px] sm:text-[24px] ">🌟</div>
  </div>
);
const Carousel = () => (
  <div
    className={`w-full h-fit
                            flex flex-row justify-start items-center
                            gap-[8px] py-[16px] sm:justify-between sm:px-[8px] sm:py-[8px]`}
  >
    <PathSlideButton direction="left" />
    <Path />
    <PathSlideButton direction="right" />
  </div>
);

const Path = () => (
  <div
    className={`w-full lg:w-[640px] h-fit sm:h-[238px] grid grid-rows-[auto_32vw] sm:grid-rows-[auto_64px] grid-cols-2 sm:grid-cols-[180px_auto] gap-y-[8px] gap-x-[4px] sm:gap-x-[12px] py-[8px]`}
  >
    <div
      className={`col-start-1 col-end-3 row-start-1 row-end-2 sm:col-start-2 sm:col-end-3
                                    w-full items-center justify-center flex flex-col gap-[12px] px-[12px] py-[8px] bg-white/50 rounded-[6px] sm:p-[8px]`}
    >
      <div className={`w-full h-fit flex flex-col items-center justify-start`}>
        <div
          className={`w-full h-fit ${montserrat.className} font-[500] text-[12px] text-center text-black
                                            sm:font-[400] sm:text-[14px]`}
        >
          SKILLS Mastery
        </div>
        <div
          className={`w-full h-fit font-[300] text-[8px] text-center ${montserrat.className} text-black sm:text-[14px] `}
        >
          Defy gravity with ease and grace
        </div>
      </div>
      <div
        className={`w-full h-fit flex flex-col items-center gap-[8px] p-[8px] lg:h-full`}
      >
        <div
          className={`w-full h-fit ${montserrat.className} font-[600] text-[8px] text-start text-[#D30C7B] text-[14px]`}
        >
          Ready to master this? Approximately X months to go!
        </div>
      </div>
    </div>

    <div
      className={`bg-black/50 w-full sm:w-[180px] rounded-[6px] row-start-2 row-end-3 col-start-1 col-end-2 sm:row-start-1 sm:row-end-2`}
    ></div>

    <div
      className={`w-full row-start-2 row-end-3 col-start-2 col-end-3 sm:col-start-1 overflow-hidden
                                    grid grid-cols-2 grid-rows-2 gap-[4px] sm:gap-[8px] sm:grid-rows-1 sm:grid-cols-[repeat(4,auto)] items-center justify-center`}
    >
      <div
        className={`bg-black/50 w-full h-full rounded-[3px] sm:w-[65px] sm:h-[44px] sm:rounded-[4px]`}
      ></div>
      <div
        className={`bg-black/50 w-full h-full rounded-[3px] sm:w-[65px] sm:h-[44px] sm:rounded-[4px]`}
      ></div>
      <div
        className={`bg-black/50 w-full h-full rounded-[3px] sm:w-[65px] sm:h-[44px] sm:rounded-[4px]`}
      ></div>
      <div
        className={`bg-black/50 w-full h-full rounded-[3px] sm:w-[65px] sm:h-[44px] sm:rounded-[4px]`}
      ></div>
    </div>
  </div>
);

const PathSlideButton = ({ direction }: { direction: "left" | "right" }) => {
  return (
    <div
      className={`bg-${
        direction === "left" ? "white" : "[#D30C7B]"
      } w-[16px] h-[16px] flex items-center justify-center p-[4px] rounded-[3px]  sm:bg-transparent sm:w-[54px] sm:h-[68px] sm:p-[16px]`}
    >
      <svg
        className="w-[5px] h-[8px] sm:w-full sm:h-full"
        viewBox="0 0 6 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={
            direction === "left"
              ? "M4.67653 8.22241L0.600098 4.22241L4.67653 0.222412L5.4001 0.932412L2.04723 4.22241L5.4001 7.51241L4.67653 8.22241Z"
              : "M1.32366 8.22241L0.600098 7.51241L3.95296 4.22241L0.600098 0.932412L1.32366 0.222412L5.4001 4.22241L1.32366 8.22241Z"
          }
          style={{
            fill: direction === "left" ? "#D30C7B" : "#EAFDFF"
          }}
        />
      </svg>
    </div>
  );
};

const Pagination = () => (
  <div
    className={`w-fit h-fit flex flex-row justify-center items-center 
                            gap-[2px] sm:gap-[4px]`}
  >
    <div className="w-[4px] h-[4px] rounded-full bg-[#1CBAC8] sm:w-[7px] sm:h-[7px]"></div>
    <div className="w-[4px] h-[4px] rounded-full bg-[#1CBAC8] sm:w-[7px] sm:h-[7px]"></div>
    <div className="w-[4px] h-[4px] rounded-full bg-[#1CBAC8] sm:w-[7px] sm:h-[7px]"></div>
  </div>
);
