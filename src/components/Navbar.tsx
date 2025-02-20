"use client";

import { font_roboto_700 } from "@/general-utils/fonts";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div
      className={`bg-gradient-to-r from-[#89E2E8] from-[24%] to-[#E392B7] to-[76%]
                  flex justify-start items-center flex-col
                  w-full h-[40px] px-[64px]`}
    >
      {/*<SignedOut>
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
      </SignedIn>*/}
    </div>
  );
}
