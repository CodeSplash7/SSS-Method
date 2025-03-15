"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useUrl from "./useUrl";

const usePath = () => {
  const cookies = document.cookie
    .split("; ")
    .reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});

  const [currentPath, setCurrentPath] = useState(usePathname());
  const [previousPath, setPreviousPath] = useState(cookies["previousPath"]);
  const [isSamePath] = useState(currentPath === previousPath);
  const [URL] = useUrl();

  useEffect(() => {
    setCurrentPath(URL.route);
    setPreviousPath(currentPath);
    document.cookie = `previousPath=${currentPath}`;
  }, [URL.route]);

  return { currentPath, previousPath, isSamePath };
};
export default usePath;
