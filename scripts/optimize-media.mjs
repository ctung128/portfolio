// One-off media optimizer. For every image/video referenced from src/, writes
// a smaller web-ready version into public/ and moves the original into
// media-originals/ (git-ignored) at the same relative path, so any file can be
// restored or re-exported. Re-run safely: files already optimized are skipped.
//
//   node scripts/optimize-media.mjs          # dry run: print the plan
//   node scripts/optimize-media.mjs --write  # convert, move originals, update refs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WRITE = process.argv.includes("--write");
const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const ORIGINALS = path.join(ROOT, "media-originals");
const SRC = path.join(ROOT, "src");

/** Never wider than this: the layout caps at ~960 CSS px, so 2000 covers 2x retina. */
const MAX_IMAGE_WIDTH = 2000;
/** Skip small files; the savings aren't worth the churn. */
const MIN_BYTES = 100 * 1024;
/** Only swap in the new file if it's at least this much smaller. */
const MAX_RATIO = 0.8;

/** Soft gradients and photos compress well lossy; UI screenshots with text don't. */
const isPhotographic = (p) => /cover-bg|\/bg-[^/]*\.png$|^\/personal\//.test(p);
/** Covers mix imagery with some UI or type: lossy, but at a higher quality. */
const isCover = (p) => /\/cover\.png$|^\/play\//.test(p);

function srcFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? srcFiles(p) : /\.(ts|tsx)$/.test(d.name) ? [p] : [];
  });
}

/** Social preview images must stay JPEG/PNG: many link unfurlers skip WebP. */
const SKIP = new Set(["/brand/social-preview.jpg"]);

const sources = srcFiles(SRC);
const refs = new Set(
  sources.flatMap((f) =>
    [...fs.readFileSync(f, "utf8").matchAll(/"(\/[^"]+\.(?:png|jpe?g|mp4))"/gi)].map((m) => m[1]),
  ),
);

const kb = (n) => `${Math.round(n / 1024)}K`;
const renames = new Map();
let before = 0;
let after = 0;

function stashOriginal(rel) {
  const dest = path.join(ORIGINALS, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(path.join(PUBLIC, rel), dest);
  return dest;
}

for (const rel of [...refs].sort()) {
  const abs = path.join(PUBLIC, rel);
  if (SKIP.has(rel) || !fs.existsSync(abs)) continue;
  const size = fs.statSync(abs).size;
  if (size < MIN_BYTES) continue;

  if (/\.mp4$/i.test(rel)) {
    if (fs.existsSync(path.join(ORIGINALS, rel))) continue;
    const tmp = path.join(ORIGINALS, ".tmp.mp4");
    fs.mkdirSync(ORIGINALS, { recursive: true });
    execFileSync("ffmpeg", [
      "-loglevel", "error", "-y", "-i", abs, "-an",
      "-vf", "scale='min(iw,1920)':'min(ih,1600)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2",
      "-c:v", "libx264", "-crf", "22", "-preset", "slow", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart", tmp,
    ]);
    const out = fs.statSync(tmp).size;
    const keep = out < size * MAX_RATIO;
    console.log(`${keep ? "✓" : "·"} ${rel}  ${kb(size)} → ${kb(out)}${keep ? "" : " (kept original)"}`);
    if (keep && WRITE) {
      stashOriginal(rel);
      fs.renameSync(tmp, abs);
    } else fs.rmSync(tmp);
    before += size;
    after += keep ? out : size;
    continue;
  }

  const outRel = rel.replace(/\.(png|jpe?g)$/i, ".webp");
  const img = sharp(abs).resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true });
  let buf;
  let mode;
  if (isPhotographic(rel) || isCover(rel)) {
    const quality = isCover(rel) ? 90 : 82;
    buf = await img.clone().webp({ quality, effort: 6 }).toBuffer();
    mode = `q${quality}`;
  } else {
    buf = await img.clone().webp({ lossless: true, effort: 6 }).toBuffer();
    mode = "lossless";
    if (buf.length > size * MAX_RATIO) {
      buf = await img.clone().webp({ quality: 92, smartSubsample: true, effort: 6 }).toBuffer();
      mode = "q92";
    }
  }
  const keep = buf.length < size * MAX_RATIO;
  console.log(`${keep ? "✓" : "·"} ${rel}  ${kb(size)} → ${kb(buf.length)} ${mode}${keep ? "" : " (kept original)"}`);
  before += size;
  after += keep ? buf.length : size;
  if (keep) {
    renames.set(rel, outRel);
    if (WRITE) {
      fs.writeFileSync(path.join(PUBLIC, outRel), buf);
      stashOriginal(rel);
    }
  }
}

if (WRITE && renames.size) {
  for (const f of sources) {
    let s = fs.readFileSync(f, "utf8");
    let changed = false;
    for (const [from, to] of renames) {
      if (s.includes(`"${from}"`)) {
        s = s.replaceAll(`"${from}"`, `"${to}"`);
        changed = true;
      }
    }
    if (changed) fs.writeFileSync(f, s);
  }
}

console.log(`\nReferenced media over ${kb(MIN_BYTES)}: ${kb(before)} → ${kb(after)}${WRITE ? "" : " (dry run)"}`);
