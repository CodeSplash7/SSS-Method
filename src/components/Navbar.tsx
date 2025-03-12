"use client";

import { font_roboto_700 } from "@/general-utils/fonts";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = [string, string | Function];

export default function Navbar() {
<<<<<<< HEAD
  const currentPath = usePathname();

  const links: NavLink[] = [
    ["Sign in", "/sign-in"],
  ];

=======
>>>>>>> b75b011 (Install clerk. Wrap clerk provider to the root layout. Add clerk sign in/sign up buttons.)
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
    </div>
  );
}

