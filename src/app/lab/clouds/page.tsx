import type { Metadata } from "next";
import { CloudPreview } from "@/components/lab/CloudPreview";

export const metadata: Metadata = {
  title: "Traced clouds",
  robots: { index: false, follow: false },
};

export default function CloudsPage() {
  return <CloudPreview />;
}
