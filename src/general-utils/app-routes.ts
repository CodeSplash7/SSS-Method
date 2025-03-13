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
  // Check if the first character is "." or "#"
  const isClassSelector = animationElementId.startsWith(".");
  const isIdSelector = animationElementId.startsWith("#");

  // Handle class selector
  if (isClassSelector) {
    const elements = document.querySelectorAll(animationElementId); // Select all elements with the class
    if (elements.length === 0) return;

    const promises = Array.from(elements).map((element) =>
      gsap.fromTo(element, animation.fromStyles, {
        ...animation.toStyles,
        duration: animation.duration,
        ease: animation.easeFunc,
      }),
    );

    await Promise.all(promises); // Wait for all animations to complete
    if (onComplete) onComplete();
    return;
  }

  // Handle ID selector
  if (isIdSelector) {
    const animationElement = document.getElementById(
      animationElementId.substring(1),
    ); // Remove "#" for ID
    if (!animationElement) return;

    await gsap.fromTo(animationElement, animation.fromStyles, {
      ...animation.toStyles,
      duration: animation.duration,
      ease: animation.easeFunc,
    });
    if (onComplete) onComplete();
    return;
  }

  // If no valid selector is provided, do nothing
  console.error("Invalid selector provided. Use . for class or # for ID.");
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
        "#animationElement",
        "translate(0%,0)",
        "translate(-100%,0)",
        1,
        DEFAULT_EASE,
      ),
      // loading opposition slide (to make the illusiong of being still)
      animateSlide(
        "#animationElementChild",
        "translate(0%,0)",
        "translate(100%,0)",
        1,
        DEFAULT_EASE,
      ),
    ]);
  },
  async doLeaveAnimation() {
    const backgroundSlide = animate("#animationElement", {
      duration: DEFAULT_DURATION,
      easeFunc: DEFAULT_EASE,
      fromStyles: {
        transform: "translate(-100%,0)",
      },
      toStyles: {
        transform: "translate(0%,0)",
      },
    });
    const childCounterSlide = animate("#animationElementChild", {
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
    const backgroundSlide = animate("#animationElement", {
      duration: DEFAULT_DURATION,
      easeFunc: DEFAULT_EASE,
      fromStyles: {
        transform: "translate(0%, 0)",
      },
      toStyles: {
        transform: "translate(100%, 0)",
      },
    });
    const childCounterSlide = animate("#animationElementChild", {
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
    const backgroundSlide = animate("#animationElement", {
      duration: 1,
      easeFunc: DEFAULT_EASE,
      fromStyles: {
        transform: "translate(100%, 0)",
      },
      toStyles: {
        transform: "translate(0%, 0)",
      },
    });
    const childCounterSlide = animate("#animationElementChild", {
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

export const PowerLevelFormRoute = {
  async doEnterAnimation() {},
  async doLeaveAnimation() {},
};

export const routes = {
  "/": HomeRoute,
  "/dashboard": DashboardRoute,
  "/power-level-form": PowerLevelFormRoute,
};
