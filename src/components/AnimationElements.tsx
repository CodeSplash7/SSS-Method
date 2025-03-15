"use client";

export default function PageEnterAnimation() {
  return (
    <>
      {pageTransitioner}
      {stepCardToForm}
    </>
  );
}

const stepCardToForm = (
  <>
    {/* Background-block */}
    <div
      id="background-block"
      style={{ display: "none" }}
      className="w-[500px] scale-75 bg-white rounded-[14px]"
    ></div>
  </>
);

const pageTransitioner = (
  <div
    id="animationElement"
    style={{ transform: "translate(-100%,0)" }}
    className={`overflow-hidden fixed top-0 left-0 w-screen h-screen bg-[#1cbac8] z-[9999] text-[20px] text-white font-bold`}
  >
    <div
      className="w-screen h-screen flex flex-col items-center justify-center"
      id="animationElementChild"
    >
      <div className="scale-150 dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </div>
  </div>
);
