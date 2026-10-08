import Link from "next/link";
import { nav, siteConfig } from "@/content/site";
import { SoundToggle } from "./SoundToggle";

/** Height of the header row; the hero's fit-the-first-screen math reads it. */
export const HEADER_HEIGHT = "64px";

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-[22px]"
    >
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9v10.5h13V9" />
      <path d="M10 19.5v-5h4v5" />
    </svg>
  );
}

/** A home icon (the logo now leads the homepage hero) and the nav. Rounded at
 * the bottom like the footer is at the top, which shows once content scrolls
 * under the translucent background. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 rounded-b-[12px] bg-cream/85 backdrop-blur">
      <div
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 sm:px-8"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="-ml-1 p-1 text-ink-soft transition-colors hover:text-ink"
          >
            <HomeIcon />
          </Link>
          <SoundToggle />
        </div>

        <nav className="flex items-center gap-5 sm:gap-8">
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
      </div>
    </header>
  );
}
