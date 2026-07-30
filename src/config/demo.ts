import type { JourneyStageId } from "@/types/journey";

/**
 * Demo panel configuration.
 *
 * Hidden in production by default. Set NEXT_PUBLIC_SHOW_DEMO_PANEL=true to
 * enable the stage control panel on readygate.app.
 */
export const demoConfig = {
  showPanel:
    process.env.NEXT_PUBLIC_SHOW_DEMO_PANEL === "true" ||
    (process.env.NODE_ENV !== "production" &&
      process.env.NEXT_PUBLIC_SHOW_DEMO_PANEL !== "false"),
  storageKey: "readygate-demo-stage",
  defaultStage: "PLANNING" satisfies JourneyStageId,
  panelTitle: "ReadyGate Demo",
} as const;
