import Image from "next/image";
import { hero, siteConfig } from "@/content/site";
import { HEADER_HEIGHT } from "@/components/layout/Header";
import { ShippedLine } from "./ShippedLine";

/** The scan's own shape, mat included (1438 x 1165). */
const PAINTING_RATIO = 1438 / 1165;
/** Non-painting height of the hero at sm+ (padding, logo row, box gaps) on top
 * of the header. The vertical name runs a little taller than the logo. */
const REST = "250px";

function Painting({ preload = false }: { preload?: boolean }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: String(PAINTING_RATIO) }}>
      <Image
        src={hero.artwork.src}
        alt={hero.artwork.alt}
        fill
        unoptimized
        loading="eager"
        fetchPriority={preload ? "high" : undefined}
        className="object-cover"
      />
    </div>
  );
}

/**
 * Laid out like a museum catalogue entry (図録): the logo (as the page title)
 * with 童雪玲 set vertically beside it, then one box ruled in light hairlines.
 *
 * - sm+: the painting on the left; on the right a cell with the tagline and
 *   the "Just shipped" line, over the label (role, location, caption). The
 *   painting's width comes from the viewport height so the hero fits the first
 *   screen uncropped; it's centred in its cell when the text column is taller.
 * - Phones: the same box stacked, every cell on 16px padding so text and
 *   painting share one left edge. The tagline stays on one line by scaling
 *   with its cell (container query units), and the shipped line matches it.
 *
 * The painting is served as-is (unoptimized, q94 WebP of a 1438px scan):
 * Next's default q75 re-encode visibly softened it.
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-8 pt-8 sm:px-8 sm:pt-10">
      <div className="flex items-start justify-between gap-6">
        <h1>
          <Image
            src="/brand/logo.svg"
            alt={siteConfig.name}
            width={86}
            height={48}
            loading="eager"
            className="h-[60px] w-auto sm:h-[76px] lg:h-[92px]"
          />
        </h1>
        <p
          lang="zh-Hans"
          className="shrink-0 font-zh text-[26px] leading-none tracking-[0.1em] text-ink [writing-mode:vertical-rl] sm:text-[30px] lg:text-[34px]"
        >
          {hero.chineseName}
        </p>
      </div>

      {/* Phones */}
      <div className="mt-6 rounded-[12px] border border-border sm:hidden">
        <div className="p-4 @container">
          <p className="whitespace-nowrap font-sans text-[min(15px,4.05cqi)] font-medium leading-snug text-ink">
            {hero.tagline}
          </p>
          <div className="mt-2.5">
            <ShippedLine className="text-[min(15px,4.05cqi)]" />
          </div>
        </div>
        <figure className="border-t border-border p-4">
          <Painting />
          <figcaption className="mt-3 font-sans text-[12px] leading-snug text-ink-faint">
            {hero.artwork.caption}
          </figcaption>
        </figure>
        <div className="border-t border-border p-4 font-sans text-[15px] leading-relaxed">
          <p className="font-semibold text-ink">{hero.subheadBold}</p>
          <p className="text-ink-soft">{hero.location}</p>
        </div>
      </div>

      {/* sm+ */}
      <div className="mt-10 hidden items-stretch rounded-[12px] border border-border sm:flex">
        <div
          className="flex w-[min(100%-17rem,calc((100svh-var(--header)-var(--rest))*1.234+2rem))] shrink-0 items-center border-r border-border p-4"
          style={{ "--header": HEADER_HEIGHT, "--rest": REST } as React.CSSProperties}
        >
          <Painting preload />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 p-5">
            <p className="text-pretty font-sans text-base font-medium leading-snug text-ink">
              {hero.tagline}
            </p>
            <div className="mt-3">
              <ShippedLine />
            </div>
          </div>
          <div className="border-t border-border p-5 font-sans text-[15px] leading-relaxed">
            <p className="font-semibold text-ink">{hero.subheadBold}</p>
            <p className="text-ink-soft">{hero.location}</p>
            <p className="mt-6 border-t border-border pt-3 text-[13px] text-ink-faint">
              {hero.artwork.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
