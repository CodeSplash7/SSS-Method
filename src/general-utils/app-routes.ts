"use client";

import gsap from "gsap";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import delay from "@/general-utils/delay";

type Animation = {
  fromStyles: CSSProperties;
  toStyles: CSSProperties;
  easeFunc: gsap.EaseString;
  duration: number;
};

const DEFAULT_DURATION = 1;
const DEFAULT_EASE = "power2.inOut";

export async function animate(
  animationElementId: string,
  animation: Animation,
  onComplete?: () => void,
) {
  const animationElement = document.getElementById(animationElementId);
  if (!animationElement) return;

  await gsap.fromTo(animationElement, animation.fromStyles, {
    ...animation.toStyles,
    duration: animation.duration,
    ease: animation.easeFunc,
  });
}

async function animateSlide(
  elementId: string,
  fromTransform: string,
  toTransform: string,
  duration: number,
  ease: gsap.EaseString,
) {
  await animate(elementId, {
    duration,
    easeFunc: ease,
    fromStyles: { transform: fromTransform },
    toStyles: { transform: toTransform },
  });
}

export const HomeRoute = {
  async doEnterAnimation() {
    await delay(200);

    await Promise.all([
      // background slide
      animateSlide(
        "animationElement",
        "translate(0%,0)",
        "translate(-100%,0)",
        1,
        DEFAULT_EASE,
      ),
      // loading opposition slide (to make the illusiong of being still)
      animateSlide(
        "animationElementChild",
        "translate(0%,0)",
        "translate(100%,0)",
        1,
        DEFAULT_EASE,
      ),
    ]);
  },
  async doLeaveAnimation() {
    const backgroundSlide = animate("animationElement", {
      duration: DEFAULT_DURATION,
      easeFunc: DEFAULT_EASE,
      fromStyles: {
        transform: "translate(-100%,0)",
      },
      toStyles: {
        transform: "translate(0%,0)",
      },
    });
    const childCounterSlide = animate("animationElementChild", {
      duration: DEFAULT_DURATION,
      easeFunc: DEFAULT_EASE,
      fromStyles: {
        transform: "translate(100%,0)",
      },
      toStyles: {
        transform: "translate(0%,0)",
      },
    });
    await Promise.all([await backgroundSlide, await childCounterSlide]);
  },
};

export const DashboardRoute = {
  async doEnterAnimation() {
    await delay(200);
    const backgroundSlide = animate("animationElement", {
      duration: DEFAULT_DURATION,
      easeFunc: DEFAULT_EASE,
      fromStyles: {
        transform: "translate(0%, 0)",
      },
      toStyles: {
        transform: "translate(100%, 0)",
      },
    });
    const childCounterSlide = animate("animationElementChild", {
      duration: DEFAULT_DURATION,
      easeFunc: DEFAULT_EASE,
      fromStyles: {
        transform: "translate(0%,0)",
      },
      toStyles: {
        transform: "translate(-100%,0)",
      },
    });
  },
  async doLeaveAnimation() {
    const backgroundSlide = animate("animationElement", {
      duration: 1,
      easeFunc: DEFAULT_EASE,
      fromStyles: {
        transform: "translate(100%, 0)",
      },
      toStyles: {
        transform: "translate(0%, 0)",
      },
    });
    const childCounterSlide = animate("animationElementChild", {
      duration: 1,
      easeFunc: DEFAULT_EASE,
      fromStyles: {
        transform: "translate(-100%,0)",
      },
      toStyles: {
        transform: "translate(0%,0)",
      },
    });
    await Promise.all([await backgroundSlide, await childCounterSlide]);
  },
};

export const routes = {
  "/": HomeRoute,
  "/dashboard": DashboardRoute,
};
