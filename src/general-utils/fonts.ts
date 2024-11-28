import { Roboto } from "next/font/google";

const Roboto_500 = Roboto({
  weight: ["500"],
  subsets: ["latin"]
});

const Roboto_700 = Roboto({
  weight: ["700"],
  subsets: ["latin"]
});

export const font_roboto_500 = Roboto_500.className;
export const font_roboto_700 = Roboto_700.className;
