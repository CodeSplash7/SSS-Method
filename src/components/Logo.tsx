import { font_roboto_700 } from "@/general-utils/fonts";

export default async function Logo() {
  return (
    <div
      className={`flex flex-col text-[50px] ${font_roboto_700} text-white leading-none`}
    >
      <div>
        <span
          className={`[text-shadow:0_0_10px_#FFBE5C,_0_0_20px_#FFBE5C,_0_0_30px_#FFBE5C,_0_0_40px_#FFBE5C] text-[#ffbe5c]`}
        >
          S
        </span>
        OVIET
      </div>
      <div>
        <span
          className={`[text-shadow:0_0_10px_#FFBE5C,_0_0_20px_#FFBE5C,_0_0_30px_#FFBE5C,_0_0_40px_#FFBE5C] text-[#ffbe5c]`}
        >
          S
        </span>
        TRENGTH
      </div>
      <div>
        <span
          className={`[text-shadow:0_0_10px_#FFBE5C,_0_0_20px_#FFBE5C,_0_0_30px_#FFBE5C,_0_0_40px_#FFBE5C] text-[#ffbe5c]`}
        >
          S
        </span>
        ECRETS
      </div>
    </div>
  );
}
