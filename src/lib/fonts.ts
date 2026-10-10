import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

export const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/** PP Neue Montreal, every weight in the free personal-use release: Hairline 100,
 * Light 300, Text Book 350 (the "Text" optical cut, `font-book`), Regular 400,
 * Semibold 600, Extrabold 800, each with its italic. There is no Medium (500), so
 * the site sets no bold weights: emphasis is Regular, set apart by colour or size.
 * See src/fonts/LICENSE-pp-neue-montreal.txt to rebuild the subsets. */
export const ppNeueMontreal = localFont({
  variable: "--font-pp-neue-montreal",
  src: [
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-Hairline.woff2", weight: "100", style: "normal" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-HairlineItalic.woff2", weight: "100", style: "italic" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontrealText-Book.woff2", weight: "350", style: "normal" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontrealText-BookItalic.woff2", weight: "350", style: "italic" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-SemiboldItalic.woff2", weight: "600", style: "italic" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-Extrabold.woff2", weight: "800", style: "normal" },
    { path: "../fonts/pp-neue-montreal/PPNeueMontreal-ExtraboldItalic.woff2", weight: "800", style: "italic" },
  ],
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
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
