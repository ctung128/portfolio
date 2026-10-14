"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * A soft "tick-tick" on every link and button press, site-wide, whether or
 * not the music is on. Plays through Web Audio rather than an <audio> tag so
 * quick repeat taps overlap instead of cutting each other off. Off on /lab
 * sketches.
 *
 * Links that leave the site used to swallow it: the page (or its focus) was
 * gone before the sound got out. So:
 * - it plays on pointerdown, ~100ms before the click, and the 3KB file is
 *   decoded on the first press anywhere (browsers only allow audio after a
 *   gesture), so later presses play at once;
 * - a click without a pointerdown (keyboard Enter) still plays on click;
 * - a same-tab link to another site waits a beat before navigating, so the
 *   tick is heard. New-tab links don't need it (this page keeps playing).
 */

const SRC = "/audio/sfx/click.mp3";
// TODO: match nichy.xyz's click volume once it can be read off their site.
const VOLUME = 0.5;
/** How long a same-tab external link waits so the tick is heard. */
const LEAVE_DELAY_MS = 160;

const PRESSABLE = "a[href], button";

export function ClickSound() {
  const pathname = usePathname();
  const enabled = !pathname.startsWith("/lab");

  useEffect(() => {
    if (!enabled) return;

    let ctx: AudioContext | null = null;
    let buffer: Promise<AudioBuffer> | null = null;
    const bytes = fetch(SRC).then((r) => r.arrayBuffer());
    /** The element a pointerdown already ticked for, so its click doesn't
     * tick again. */
    let ticked: Element | null = null;

    const play = async () => {
      ctx ??= new AudioContext();
      if (ctx.state === "suspended") await ctx.resume();
      const c = ctx;
      buffer ??= bytes.then((b) => c.decodeAudioData(b.slice(0)));
      const source = c.createBufferSource();
      const gain = c.createGain();
      gain.gain.value = VOLUME;
      source.buffer = await buffer;
      source.connect(gain).connect(c.destination);
      source.start();
    };

    const pressable = (e: Event) => {
      const el = (e.target as Element | null)?.closest(PRESSABLE);
      return el && !(el as HTMLButtonElement).disabled ? el : null;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const el = pressable(e);
      if (!el) return;
      ticked = el;
      play().catch(() => {});
    };

    const onClick = (e: MouseEvent) => {
      const el = pressable(e);
      if (!el) return;
      if (ticked !== el) play().catch(() => {});
      ticked = null;
    };

    // Bubble phase, after the page's own handlers, so anything that already
    // handled the click (e.g. Email copying the address) is left alone.
    const onLeave = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.hasAttribute("download")) return;
      if (a.target && a.target !== "_self") return;
      const url = new URL(a.href, location.href);
      if (!/^https?:$/.test(url.protocol) || url.origin === location.origin) return;
      e.preventDefault();
      setTimeout(() => location.assign(url.href), LEAVE_DELAY_MS);
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("click", onLeave);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, { capture: true });
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("click", onLeave);
      ctx?.close();
    };
  }, [enabled]);

  return null;
}
