import type { Metadata } from "next";
import { about } from "@/content/site";
import { AboutSection } from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description: about.paragraphs[0] as string,
};

export default function AboutPage() {
  return <AboutSection />;
}
