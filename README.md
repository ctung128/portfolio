# Carolyn Tung — Portfolio

Next.js 16 + TypeScript + Tailwind CSS v4. Replaces the Framer site at carolynatung.com.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy lives in `src/content/` as plain TypeScript objects — no MDX, no CMS, no touching layout code.

- `src/content/site.ts` — hero text, specialization pillars, about/education, recommendations, nav links, resume/Calendly/LinkedIn URLs.
- `src/content/case-studies/*.ts` — one file per case study (`props.ts`, `splitev.ts`, `eva.ts`, `inkline.ts`, `jino.ts`). Each is a `CaseStudy` object (shape defined in `types.ts`) with a `sections` array. Each section has an `id`, a short `navLabel` (shown in the sticky sidebar table of contents), a `heading`, and a list of `blocks`.
- Block types: `paragraph`, `subheading`, `quote`, `stats`, `list`, `image`. Add/reorder/remove blocks freely — the page and the table of contents both render directly from this data.
- To add a new case study: copy an existing file, fill it in, then add it to the `caseStudies` array in `src/content/case-studies/index.ts`. It'll automatically get a route at `/work/<slug>`, a homepage card, and a spot in the prev/next case study nav.

## Adding real images

Case studies currently reference image paths that don't exist yet (e.g. `/case-studies/props/cover.png`), so they render as a labeled placeholder box instead of a broken image. To swap in a real screenshot:

1. Drop the file into `public/case-studies/<slug>/` using the exact filename referenced in that case study's data file (each placeholder box shows you the expected path).
2. That's it — the image renders automatically once the file exists at that path. No code changes needed.

## Personal photos

The hero's rotating photo strip and the About section's portrait are also placeholder-until-real-file, same mechanism as case study images. Drop files into `public/personal/`:

- `street.jpg`, `calligraphy.jpg`, `flowers.jpg`, `storefront.jpg`, `boy.jpg`, `decor.jpg` — hero carousel (edit the list in `src/content/site.ts` → `personalPhotos` to add, remove, or relabel)
- `me.jpg` — small circular photo next to the "About" heading (`src/content/site.ts` → `portrait`)

## Brand assets

`public/brand/` holds the logo, favicon, and OG/social preview image pulled from the original site. `src/app/icon.svg` is the browser tab favicon.

## Deploying (Vercel)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Framework preset (Next.js) is auto-detected — no config needed.
3. Once deployed, go to the project's Settings → Domains and add `carolynatung.com` (and `www.carolynatung.com`).
4. Vercel will show you DNS records to add. Update those at your domain registrar (wherever `carolynatung.com` is currently pointed for Framer), then remove the domain from Framer once DNS has propagated.
5. Every push to `main` auto-deploys.

Free tier covers this site comfortably (static pages, no server costs).
