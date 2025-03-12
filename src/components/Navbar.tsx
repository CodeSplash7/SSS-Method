"use client";

import { font_roboto_700 } from "@/general-utils/fonts";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div
      className={`bg-[#111111] w-full h-[76px] px-[48px] flex flex-row justify-start items-center gap-[32px] `}
    >
      <SignedOut>
        <SignInButton>
          <div
            className={` hover:text-[#1cbac8] transition duration-150 text-[24px] sm:text-[13px] text-white font-bold ${font_roboto_700}`}
          >
            Sign in
          </div>
        </SignInButton>
        <SignUpButton>
          <div
            className={` hover:text-[#1cbac8] transition duration-150 text-[24px] sm:text-[13px] text-white font-bold ${font_roboto_700}`}
          >
            Sign up
          </div>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
