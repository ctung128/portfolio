@AGENTS.md

## Media

Run `node scripts/optimize-media.mjs --write` after adding images/videos: it converts referenced PNG/JPGs to WebP (lossless for UI screenshots, q82–q90 for gradients/photos/covers, max 2000px wide), re-encodes MP4s (CRF 22, no audio), rewrites the paths in `src/`, and moves originals to the git-ignored `media-originals/`. Use `<LazyVideo>` instead of `<video autoPlay>`, and `loading="lazy"` on below-the-fold `<img>`s. Keep `/brand/social-preview.jpg` a JPEG (link unfurlers often skip WebP).

## Project log

Running log of notable work done with Claude Code, newest first. Keep entries to a few bullets — this is a changelog, not a task tracker.

### 2026-09-24
- Load performance: referenced media 118 MB → 27 MB (`scripts/optimize-media.mjs`; biggest wins were the `cover-bg.png` gradients, 4–8 MB → ~100 KB each, and Props `cover.mp4`, 28 MB → 3.4 MB). Videos now use `LazyVideo` (download/play only near the viewport, pause off-screen); `CaseStudyImage` uses `useImgFailed` instead of JS-preloading every image, so `loading="lazy"` works. Homepage initial media ~60 MB → ~1 MB. Unused `.mov` sources and the duplicate `props/props.mp4` moved to `media-originals/unused/`.
- Props problem section: animated iPhone 13 Pro `mockup` cycling the six original-app screens (`before-1..6.png`) on `cover-bg.png`, below the stats, labeled "Before the redesign". New `labelStrong` mockup option renders the label in ink-soft (≥5.2:1 on the lime corner; the default ink-faint is ~2.6:1 and fails AA).
- EVA screenshots sit on a `#E6EFF2` tint card (from EVA's own pale blue-gray surfaces): full screens in a browser frame, cropped components floating. Two-column `comparison` cards (citations, Before/After) keep the default off-white so the floating screens stand out. `crossfade` now takes `background` (renders in a `BrowserFrame`, extracted from `CaseStudyImage`).
- EVA problem section: insights now use the Jino-style `insights` block (label + arrow, `quote` is now optional); problem statement and HMW use a new `callout` block (eyebrow label above non-italic serif text) instead of an attributed italic quote.
- EVA iterations: iterations are serif headings with a `kicker` ("Iteration 1"); rejected citation explorations sit side-by-side in a `comparison` with outlined "Rejected" chips; shipped features get a filled "Shipped" chip (`status` on subheadings and comparison groups). The section's own eyebrow + heading are hidden via a new `hideHeader` section option, so "Iteration 1" opens it.
- New MySupplementals case study (`/work/mysupplementals`): overview, problem/stakeholders, opportunity, four design iterations, outcome with founder testimonial, and a closing reflection on opinionated design.
- Case study header: optional `liveUrl` renders a "See it live ↗" button next to the one-liner.
- New `video` block type: autoplaying looping video styled like an image card.
- Favicon: light/dark variants (`public/brand/favicon-light.svg` / `favicon-dark.svg`) wired via `metadata.icons` with `prefers-color-scheme` media queries; removed `src/app/icon.svg`.
- Screenshot framing: image blocks take `frame: "browser" | "float"` on a `background` card; comparison blocks take `float`; paragraphs take an inline `link`. MySupplementals uses a `#F1F7FA` tint.

### 2026-09-21
- About section: redesigned the Reading/Listening/Learning/Recommending pillar cards to match the original Framer site — moved out of the cramped half-column into a full-width 2x2 grid below the bio, `#F7F7F7` background with a custom drop shadow, larger type/padding/star bullets.
- About content: new bio intro ("Hi there! I'm a product designer..."), removed "Stay True", "Farewell My Concubine", "Blockchain Chicken Farm"; swapped "Philosophy of aesthetics" for "A freelance portrait photography studio".
- CTA buttons: hover now triggers on the whole pill (was arrow-glyph-only via `:has()`); the arrow slides in sync with the label instead of sitting static.
- Design tokens: renamed `--color-blue` to `--color-green` (`#628A00`), consolidated across all usages.
- Case study cards: removed numbering and description text, renamed "Props MVP Redesign" to "Props", added "Shipped <year>" labels to SplitEV/Jino/Inkline.
- Installed GitHub CLI (`gh`) locally; repo not yet pushed to GitHub — pending `gh auth login` from the user, then create + push to a new `portfolio` repo.
