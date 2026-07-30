"use client";

import type { TranslationKey } from "@/i18n/types";
import { useTranslation } from "@/i18n/useTranslation";
import type { DemoTourStepId } from "@/data/demoTourSteps";

type DemoTourStepBodyProps = {
  stepId: DemoTourStepId;
  bodyKey: TranslationKey;
};

export function DemoTourStepBody({ stepId, bodyKey }: DemoTourStepBodyProps) {
  const { t } = useTranslation();

  if (stepId === "demo-panel") {
    return (
      <>
        {t("demo.tour.steps.demoPanel.bodyBefore")}
        <strong className="font-semibold text-foreground">
          &ldquo;{t("demo.tour.steps.demoPanel.disruptionLabel")}&rdquo;
        </strong>
        {t("demo.tour.steps.demoPanel.bodyAfter")}
      </>
    );
  }

  return t(bodyKey);
}
