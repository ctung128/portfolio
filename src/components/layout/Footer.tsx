"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import "./footer.css";

/** NYC, for the weather line. */
const NYC = { lat: 40.7128, lon: -74.006 };

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Play", href: "/play" },
  { label: "Library", href: "/library" },
];

/** WMO weather code → one word ("Sunny", "Clear", ...). */
function describe(code: number, isDay: boolean) {
  if (code === 0) return isDay ? "Sunny" : "Clear";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow showers";
  return "Stormy";
}

function useNycWeather() {
  const [weather, setWeather] = useState<string | null>(null);
  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${NYC.lat}&longitude=${NYC.lon}` +
      "&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit";
    let cancelled = false;
    const load = () =>
      fetch(url)
        .then((r) => r.json())
        .then((d) => {
          if (cancelled || !d.current) return;
          const { temperature_2m, weather_code, is_day } = d.current;
          setWeather(`${describe(weather_code, is_day === 1)}, ${Math.round(temperature_2m)}°`);
        })
        .catch(() => {});
    load();
    const id = setInterval(load, 15 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);
  return weather;
}

const clockFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
});

function useNycClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(`${clockFormat.format(new Date())} ET`);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-[18px]">
      <path d="M20 8H10a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-[18px]">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

/** Site footer in the site's ink: the logo on the left with NYC weather +
 * clock beneath, Email / LinkedIn and the nav as two columns on the right. Email copies the address and flashes a
 * toast. */
export function Footer() {
  const pathname = usePathname();
  const weather = useNycWeather();
  const time = useNycClock();
  const [copied, setCopied] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copyEmail = (e: React.MouseEvent) => {
    if (!navigator.clipboard) return; // fall through to mailto:
    e.preventDefault();
    navigator.clipboard.writeText(siteConfig.email).then(() => {
      setCopied(true);
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <footer className="ft w-full rounded-t-[12px] bg-ink text-white/80">
      <div className="mx-auto max-w-5xl px-8 pt-12 pb-16 sm:px-12 sm:pt-[72px] sm:pb-[92px]">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-stretch sm:justify-between">
          <div className="flex flex-col gap-6 sm:justify-between">
            <Image
              src="/brand/logo-light.svg"
              alt={siteConfig.name}
              width={86}
              height={48}
              className="h-auto w-[180px] sm:-mt-[7px] sm:w-[220px]"
            />
            <p className="flex items-center gap-5 font-mono text-[15px] text-white/80 sm:text-base" aria-live="off">
              <span className="ft-dot" aria-hidden />
              <span className="flex flex-wrap gap-x-8 gap-y-1">
                <span>{weather ?? "New York"}</span>
                <span suppressHydrationWarning>{time ?? " "}</span>
              </span>
            </p>
          </div>

          <div className="flex gap-16 sm:gap-20">
            <ul className="flex flex-col items-start gap-3.5">
              <li className="relative">
                <a href={`mailto:${siteConfig.email}`} onClick={copyEmail} className="ft-link flex items-center gap-2.5 font-serif text-2xl">
                  <span className="ft-lbl">Email</span>
                  <CopyIcon />
                </a>
                <span className={`ft-toast ${copied ? "is-on" : ""}`} role="status">
                  {copied ? "Copied!" : ""}
                </span>
              </li>
              <li>
                <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="ft-link flex items-center gap-2.5 font-serif text-2xl">
                  <span className="ft-lbl">LinkedIn</span>
                  <ExternalIcon />
                </a>
              </li>
            </ul>

            <nav aria-label="Footer" className="flex flex-col items-start gap-3.5">
              {navLinks.map((link) => {
                const current = link.href === pathname;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className="ft-link font-serif text-2xl"
                  >
                    <span className="ft-lbl">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
