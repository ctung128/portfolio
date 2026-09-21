import Image from "next/image";
import { siteConfig } from "@/content/site";

const footerLinks = [
  { label: "Email", href: `mailto:${siteConfig.email}` },
  { label: "Calendly", href: siteConfig.calendly },
  { label: "Resume", href: siteConfig.resume },
  { label: "LinkedIn", href: siteConfig.linkedin },
];

export function Footer() {
  return (
    <footer className="w-full rounded-t-[12px] bg-ink">
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-10 px-8 py-10 sm:flex-row sm:items-start sm:px-12 sm:py-14">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-light.svg"
              alt={siteConfig.name}
              width={86}
              height={58}
              className="h-[58px] w-[86px]"
            />
            <span className="font-sans text-xs text-white/50">
              © {new Date().getFullYear()}
            </span>
          </div>
          <a
            href={siteConfig.calendly}
            target="_blank"
            rel="noreferrer"
            className="btn-slide mt-8 inline-flex items-center gap-1.5 rounded-[12px] bg-[#FAFAFA] px-5 py-2.5 font-sans text-sm text-ink"
          >
            <span className="btn-slide-viewport"><span>Let&rsquo;s talk</span></span>
            <span className="btn-slide-viewport" aria-hidden><span>↗</span></span>
          </a>
        </div>

        <ul className="flex w-full flex-col gap-4 sm:w-56">
          {footerLinks.map((link) => {
            const isMailto = link.href.startsWith("mailto:");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={isMailto ? undefined : "_blank"}
                  rel={isMailto ? undefined : "noreferrer"}
                  className="flex items-center justify-between font-serif text-lg text-white/80 transition-colors hover:text-white"
                >
                  {link.label} <span aria-hidden className="font-sans text-sm">↗</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
