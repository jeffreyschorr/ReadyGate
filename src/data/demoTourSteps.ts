import type { TranslationKey } from "@/i18n/types";

export type DemoTourStepId =
  | "demo-panel"
  | "today-header"
  | "next-action"
  | "main-nav"
  | "utility-actions";

export type DemoTourStep = {
  id: DemoTourStepId;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  /** Prefer tooltip above the highlight (for bottom-anchored UI). */
  placement?: "above" | "below" | "auto";
};

export const DEMO_TOUR_STEPS: DemoTourStep[] = [
  {
    id: "demo-panel",
    titleKey: "demo.tour.steps.demoPanel.title",
    bodyKey: "demo.tour.steps.demoPanel.bodyBefore",
    placement: "above",
  },
  {
    id: "today-header",
    titleKey: "demo.tour.steps.todayHeader.title",
    bodyKey: "demo.tour.steps.todayHeader.body",
  },
  {
    id: "next-action",
    titleKey: "demo.tour.steps.nextAction.title",
    bodyKey: "demo.tour.steps.nextAction.body",
  },
  {
    id: "main-nav",
    titleKey: "demo.tour.steps.mainNav.title",
    bodyKey: "demo.tour.steps.mainNav.body",
    placement: "above",
  },
  {
    id: "utility-actions",
    titleKey: "demo.tour.steps.utilityActions.title",
    bodyKey: "demo.tour.steps.utilityActions.body",
  },
];
