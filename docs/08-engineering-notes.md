# Engineering Notes

Captures technical decisions, implementation notes, and conventions for ReadyGate development.

## Journey Simulator

### What it is

A collapsible **ReadyGate Demo** panel for presenters. It is styled separately from passenger UI (neutral grey chrome) and must not ship as product chrome.

### Hiding the demo panel

Set in `src/config/demo.ts`:

```ts
showPanel: false,
```

Or at build time:

```bash
NEXT_PUBLIC_SHOW_DEMO_PANEL=false npm run dev
```

### Dev server stability

Do not run `npm run build` while `npm run dev` is active — it corrupts `.next` and causes CSS/JS 404s. Use `npm run dev:clean` to reset.

### Stage persistence

The selected stage is written to `localStorage` on change. Default stage: `LEAVING_HOME` (configurable in `src/config/demo.ts`).

### Automatic stage calculation (future)

A production service might compute stage from:

- Days until departure (booking)
- Check-in window open/closed
- Geofence / airport presence
- Security and boarding events from flight ops feeds

The prototype intentionally avoids date-based auto-advance so demos remain predictable.

## Status

Draft
