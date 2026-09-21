import Link from "next/link";
import Image from "next/image";
import { nav, siteConfig } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-cream/85 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/brand/logo.svg"
            alt={siteConfig.name}
            width={86}
            height={58}
            className="h-[58px] w-[86px]"
            priority
          />
        </Link>

        <nav className="hidden items-center justify-center gap-8 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="font-serif text-lg text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={siteConfig.calendly}
          target="_blank"
          rel="noreferrer"
          className="btn-slide inline-flex items-center gap-1.5 justify-self-end rounded-[12px] bg-ink px-4 py-2 font-sans text-sm text-cream"
        >
          <span className="btn-slide-viewport"><span>Let&rsquo;s talk</span></span>
          <span className="btn-slide-viewport" aria-hidden><span>↗</span></span>
        </a>
      </div>
    </header>
  );
}
