"use client";

import { font_roboto_700 } from "@/general-utils/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = [string, string];

export default function Navbar() {
  const currentPath = usePathname();

  const links: NavLink[] = [
    ["Sign in", "/sign-in"],
  ];

  return (
    <div
      className={`bg-[#111111] w-full h-[76px] px-[48px] flex flex-row justify-between items-center gap-[32px] `}
    >
      {links.map((l, index) => (
        <Link
          key={index}
          className={`${
            isCurrentPath(l[1], currentPath) && "text-[#1cbac8]"
          } hover:text-[#1cbac8] transition duration-150 text-[24px] sm:text-[13px] text-white font-bold ${font_roboto_700}`}
          href={l[1]}
        >
          {l[0]}
        </Link>
      ))}
    </div>
  );
}

function isCurrentPath(path: string, currentPath: string) {
  if (path === currentPath) return true;
  return false;
}
