# ReadyGate

**Live demo:** [readygate.app](https://readygate.app) · [Open demo](https://readygate.app/home/)

ReadyGate is an independent product concept: a mobile-first web prototype that shows how a travel app could adapt across the day of travel.

It follows one simulated Virgin Australia flight (VA 313, Brisbane to Melbourne) and changes what it highlights as the journey moves from planning through arrival. The goal is to reduce the mental load of checking multiple apps, emails, and signs for the same trip details.

ReadyGate is not affiliated with Virgin Australia. It uses mock data and a demo stage control for presentation only.

## Product principles

- Show what matters now, not everything at once.
- One clear next action per screen where possible.
- Calm layout that stays readable under time pressure.
- Language, units, and accessibility preferences apply across the app.

## Technical approach

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19, MUI, Tailwind CSS |
| Motion | Framer Motion (respects reduced motion) |
| i18n | Typed keys in `src/i18n/locales/` (English and Japanese enabled) |
| State | React context for preferences and demo journey stage |
| Persistence | `localStorage` for traveller preferences and demo stage |

French locale files are prepared in the repo but disabled in the UI until native review.

See `src/i18n/README.md` for translation workflow and `PROJECT.md` for product context.

## Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Do not run `npm run build` while `npm run dev` is active. Use `npm run dev:clean` if the dev cache needs resetting.

## Scripts

```bash
npm run lint      # ESLint
npm run build     # Production build
npm run start     # Serve production build
```

Type checking:

```bash
npx tsc --noEmit
```

Regenerate Japanese and French locale files after editing `en.json`:

```bash
node scripts/build-ja-fr-locales.mjs
```

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page |
| `/home` | Stage-adaptive today view (demo entry) |
| `/journey` | Journey timeline and health |
| `/flight` | Flight and boarding details |
| `/destination` | Arrival, hotel, and local info |
| `/notifications` | Updates and alerts |
| `/settings/preferences` | Language, units, accessibility |
| `/engineering` | Technical summary for reviewers |
| `/brand` | Brand guide |

`/updates` redirects to `/notifications`. `/replay` redirects to `/journey`.

## Demo reset

When the demo panel is visible, **Reset demo** clears stored preferences and journey stage after confirmation. Use this before a presentation run.

Set `NEXT_PUBLIC_SHOW_DEMO_PANEL=true` in production to show the demo panel on readygate.app.

## Deployment

Production URL: [https://readygate.app](https://readygate.app)

ReadyGate is deployed as a **static export** (HTML/CSS/JS in `out/`). No Node.js is required on the server.

### Build upload archive (on your Mac)

```bash
npm run export:static
```

This creates:

| Output | Purpose |
| --- | --- |
| `out/` | Static site files |
| `dist/readygate-static/` | Same files, ready to upload |
| `dist/readygate-static.zip` | Zip archive for cPanel File Manager |

Set `NEXT_PUBLIC_SHOW_DEMO_PANEL=true` at build time so the demo panel appears on readygate.app (the export script does this automatically).

### Upload to cPanel

1. Open **File Manager** → `public_html` for `readygate.app`
2. Delete old site files (keep anything unrelated to this app)
3. Upload **`dist/readygate-static.zip`**
4. **Extract** the archive into `public_html` (contents at the root, not inside a subfolder)
5. Confirm `.htaccess` is present (redirects and security headers)

Visit https://readygate.app

### Updates

After code changes:

```bash
npm run export:static
```

Re-upload and extract the new zip (or replace the folder contents).

Redirects and security headers for Apache live in `public/.htaccess` and are copied into `out/` on build.

### Local smoke test

```bash
npm run export:static
npx serve out
```

Site metadata, Open Graph tags, and canonical URLs are configured in `src/config/site.ts` and `src/lib/metadata.ts`.

Search indexing is disabled (`noindex`, `robots.txt` disallow). No public sitemap is generated.

## Analytics

Analytics is not installed. See `src/lib/analytics.ts` for a documented placeholder to add Plausible, Fathom, or Google Analytics later.
