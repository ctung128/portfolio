import type { Metadata } from "next";
import { ColorLab } from "@/components/lab/ColorLab";

export const metadata: Metadata = {
  title: "Colour and motion lab",
  robots: { index: false, follow: false },
};

/** Three colour + motion directions (quiet → bold), each shown across a
 * sample of every page. Temporary: remove once one is picked. */
export default function ColorLabPage() {
  return <ColorLab />;
}
