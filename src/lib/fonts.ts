import { Instrument_Serif, Open_Sans } from "next/font/google";
import localFont from "next/font/local";

export const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Huiwen Mincho (汇文明朝体), subset to the hero's Chinese name only; see
 * src/fonts/LICENSE-huiwen-mincho.txt to rebuild it when that text changes. */
export const huiwenMincho = localFont({
  variable: "--font-huiwen-mincho",
  src: "../fonts/huiwen-mincho-hero.woff2",
  weight: "400",
  display: "swap",
  fallback: ["Songti SC", "Noto Serif SC", "serif"],
});
