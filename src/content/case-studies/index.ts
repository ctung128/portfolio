import { props } from "./props";
import { splitev } from "./splitev";
import { eva } from "./eva";
import { jino } from "./jino";
import { mysupplementals } from "./mysupplementals";
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [splitev, eva, props, mysupplementals, jino];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export type { CaseStudy, CaseStudySection, CaseStudyBlock } from "./types";
