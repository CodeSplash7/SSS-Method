"use client";

import { usePathname } from "next/navigation";

const usePath = () => {
  const currentPath = usePathname();
  const cookies = document.cookie
    .split("; ")
    .reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});
  const previousPath = cookies["previousPath"];

  const isSamePath = currentPath === previousPath;
  return { currentPath, previousPath, isSamePath };
};
export default usePath;
