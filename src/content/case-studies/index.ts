import { props } from "./props";
import { splitev } from "./splitev";
import { eva } from "./eva";
import { inkline } from "./inkline";
import { jino } from "./jino";
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [props, splitev, eva, inkline, jino];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export type { CaseStudy, CaseStudySection, CaseStudyBlock } from "./types";
