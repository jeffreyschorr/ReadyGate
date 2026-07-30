# Technical Architecture

Describes the technical stack, application structure, and key architectural decisions for the ReadyGate Next.js application.

## Application structure

```
src/
├── app/(app)/          # Routed pages (Home, Journey, Flight, Settings, …)
├── components/
│   ├── demo/           # Prototype-only UI (Journey Simulator panel)
│   ├── home/           # Home screen composition
│   ├── journey/        # Journey-specific presentation components
│   └── providers/      # Client providers (JourneyDemoProvider)
├── config/             # App and demo configuration
├── context/            # React context (JourneyDemoContext)
├── data/               # Mock fixtures and stage content config
├── hooks/              # useJourneyDemo and related hooks
├── services/           # Data access layer (notifications, etc.)
└── types/              # Shared TypeScript models
```

## Journey state (prototype)

| Layer | Responsibility |
| --- | --- |
| `types/journey.ts` | `JourneyStageId`, pulse states, stage content shapes |
| `data/mockJourney.ts` | Fictional Alex Morgan BNE→MEL fixture |
| `data/stageContent.ts` | Central per-stage copy, cards, visibility rules |
| `context/JourneyDemoContext.tsx` | Selected stage + persistence |
| `hooks/useJourneyDemo.ts` | Consumer hook for any client component |
| `config/demo.ts` | Show/hide demo panel |

Stage selection is stored in `localStorage` under `readygate-demo-stage` and survives refresh. The provider wraps the `(app)` route group so stage is available across navigation.

## Styling

Next.js App Router, TypeScript, MUI for interactive primitives, Tailwind CSS v4 for layout and tokens (`src/app/globals.css`).

## Status

Draft
