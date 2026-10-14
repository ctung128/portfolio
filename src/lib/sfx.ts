/**
 * Short UI sound effects through one shared Web Audio context, so repeats
 * overlap instead of cutting each other off. Browsers only allow sound once
 * the visitor has clicked, tapped or typed on the page, so before that (and
 * for hover-only visitors) this stays silent rather than erroring.
 */

let ctx: AudioContext | null = null;
const buffers = new Map<string, Promise<AudioBuffer>>();

const activated = () =>
  (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? true;

/** A soft pop as the pointer lands on a sidequest, a link with a preview print or a library book. */
export const POP = { src: "/audio/sfx/pop.mp3", volume: 0.3 };

/** A twinkle as the Cai Gao sticker blooms. */
export const TWINKLE = { src: "/audio/sfx/twinkle.mp3", volume: 0.4 };

export async function playSfx(src: string, volume = 0.5) {
  if (!activated()) return;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") await ctx.resume();
  const c = ctx;
  if (!buffers.has(src)) {
    buffers.set(
      src,
      fetch(src)
        .then((r) => r.arrayBuffer())
        .then((b) => c.decodeAudioData(b)),
    );
  }
  const source = c.createBufferSource();
  const gain = c.createGain();
  gain.gain.value = volume;
  source.buffer = await buffers.get(src)!;
  source.connect(gain).connect(c.destination);
  source.start();
}
