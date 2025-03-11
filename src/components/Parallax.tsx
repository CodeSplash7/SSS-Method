"use client";
import { useEffect } from "react";

export default function Parallax({
  imagePath,
  children
}: {
  imagePath: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function handleScroll() {
      const parallaxElement = document.getElementById("parallax-element");
      if (!parallaxElement) return;

      const scrollPosition = window.scrollY;
      parallaxElement.style.backgroundPositionY = `${scrollPosition * -0.3}px`;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      id="parallax-element"
      className="h-fit w-full bg-fixed bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("${imagePath}")` }}
    >
      {children}
    </div>
  );
}
