import type { Metadata } from "next";
import { about } from "@/content/site";
import { AboutSection } from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description: [about.paragraphs[0]]
    .flat()
    .map((seg) => (typeof seg === "string" ? seg : seg.text))
    .join(""),
};

export default function AboutPage() {
  return <AboutSection />;
}
