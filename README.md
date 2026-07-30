# ReadyGate

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

### Environment

Copy `.env.example` to `.env` on the server (or set variables in cPanel):

```bash
NEXT_PUBLIC_SHOW_DEMO_PANEL=true
```

Rebuild after changing public env vars (`npm run build`).

### cPanel / WHM (Node.js)

Requires **Setup Node.js App** (Application Manager) with Node 18+.

1. **Git Version Control** (cPanel) or SSH: clone `https://github.com/jeffreyschorr/readygate.git` into the app directory (e.g. `~/readygate`).
2. **Setup Node.js App**:
   - Application root: path to the cloned repo
   - Application URL: `readygate.app` (or subdomain for testing)
   - Application startup file: `server.js`
   - Node.js version: 18 or 20
3. Add environment variable: `NEXT_PUBLIC_SHOW_DEMO_PANEL` = `true`
4. In the app terminal (or SSH):

```bash
cd ~/readygate
npm ci
npm run build
```

5. **Restart** the Node.js app in cPanel.

Document root for the domain should proxy to the Node app (cPanel usually configures this when you attach the URL to the Node application). If the site shows a directory listing, the domain is pointing at an empty `public_html` instead of the Node app — reassign the domain in **Domains** / **Setup Node.js App**.

Updates: pull latest from GitHub, then `npm ci && npm run build`, and restart the app.

### Local production smoke test

```bash
npm run build
npm run start
```

Site metadata, Open Graph tags, and canonical URLs are configured in `src/config/site.ts` and `src/lib/metadata.ts`.

Search indexing is disabled (`noindex`, `robots.txt` disallow). No public sitemap is generated.

Security headers are set in `next.config.ts`.

## Analytics

Analytics is not installed. See `src/lib/analytics.ts` for a documented placeholder to add Plausible, Fathom, or Google Analytics later.
