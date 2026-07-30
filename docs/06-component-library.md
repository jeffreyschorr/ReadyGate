# Component Library

Catalogs UI components used in ReadyGate, including usage guidelines, variants, and composition patterns.

## Journey and Home components

| Component | Location | Purpose |
| --- | --- | --- |
| `JourneyPulse` | `components/journey/` | Relaxed / attentive / action-required status with text labels |
| `JourneyProgress` | `components/journey/` | Stage list and progress bar |
| `ContextCard` | `components/journey/` | Stage-specific detail tiles |
| `ReassuranceMessage` | `components/journey/` | Calm supporting copy |
| `NextAction` | `components/home/` | Primary “what happens next” card |
| `WhatChanged` | `components/home/` | Secondary “since you last checked” area |
| `FlightSummary` | `components/home/` | Conditional flight details per stage |
| `HomeView` | `components/home/` | Stage-adaptive Home composition |
| `JourneySimulator` | `components/demo/` | Prototype stage control panel (not passenger UI) |

Stage copy and visibility rules live in `src/data/stageContent.ts` — components consume typed config rather than embedding conditionals.

## Status

Draft
