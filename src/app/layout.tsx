import type { Metadata } from "next";
import { instrumentSerif, openSans } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} — Product Designer`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "Product designer who takes 0→1 problems to shipped products. Case studies in AI, climate tech, consumer social, and B2B SaaS.",
  openGraph: {
    title: `${siteConfig.name} — Product Designer`,
    description:
      "Product designer who takes 0→1 problems to shipped products.",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    images: ["/brand/social-preview.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/social-preview.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
