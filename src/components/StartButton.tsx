"use client";

import { animate, HomeRoute } from "@/general-utils/app-routes";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function StartButton() {
  const router = useRouter();
  router.prefetch("/dashboard");
  return (
    <>
      <SignedOut>
        <SignUpButton>
          <div
            className={`sm:text-[1rem] text-[2rem] flex justify-center px-[30px] w-full sm:w-fit py-[20px] sm:py-[12.5px] border-0 rounded-full bg-[#1cbac8] text-white font-bold transition-all duration-200 hover:bg-[#ffbe5c] hover:shadow-[0_0_100px_#ffbe5c75] hover:scale-110 active:bg-[#1cbac8] active:duration-250 active:shadow-none active:scale-95`}
          >
            START 🗿
          </div>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <div
          onClick={async () => {
            await HomeRoute.doLeaveAnimation();
            router.push("/dashboard");
          }}
          className={`sm:text-[1rem] text-[2rem] flex justify-center px-[30px] w-full sm:w-fit py-[20px] sm:py-[12.5px] border-0 rounded-full bg-[#1cbac8] text-white font-bold transition-all duration-200 hover:bg-[#ffbe5c] hover:shadow-[0_0_100px_#ffbe5c75] hover:scale-110 active:bg-[#1cbac8] active:duration-250 active:shadow-none active:scale-95`}
        >
          START 🗿
        </div>
      </SignedIn>
    </>
  );
}
