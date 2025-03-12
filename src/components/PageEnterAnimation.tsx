"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { HomeRoute, routes } from "@/general-utils/app-routes";

export default function PageEnterAnimation() {
  const pathname = usePathname();
  const cookies = document.cookie
    .split("; ")
    .reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});
  const previousPath = cookies["previousPath"];

  useEffect(() => {
    if (previousPath === pathname) return;
    document.cookie = `previousPath=${pathname}`;

    routes[pathname as "/"].doEnterAnimation();
  }, [pathname]);

  return (
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
}
