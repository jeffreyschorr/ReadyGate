"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import { motionDuration, motionEase } from "@/lib/motion";
import type { JourneyProgressStep } from "@/types/journey";
import { cn } from "@/lib/utils";

type JourneyProgressProps = {
  steps: JourneyProgressStep[];
};

export function JourneyProgress({ steps }: JourneyProgressProps) {
  const reducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const currentIndex = steps.findIndex((step) => step.status === "current");
  const progressPercent =
    steps.length <= 1 ? 0 : Math.round((currentIndex / (steps.length - 1)) * 100);

  return (
    <Card>
      <section aria-label={t("a11y.journeyProgress")}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <SectionHeading>{t("journey.page.tripProgress")}</SectionHeading>
          <p className="text-sm text-muted">
            {t("format.stageOfTotal", {
              current: currentIndex + 1,
              total: steps.length,
            })}
          </p>
        </div>

        <div
          className="mb-5 h-2 overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          aria-label={t("a11y.journeyCompletePercent", { percent: progressPercent })}
        >
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{
              duration: reducedMotion ? 0 : motionDuration.progress,
              ease: motionEase,
            }}
          />
        </div>

        <ol className="space-y-0">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <li
                key={step.id}
                className={cn(
                  "relative flex gap-3 pb-3 last:pb-0",
                  step.status === "current" &&
                    "-mx-2 rounded-md bg-accent-subtle/70 px-2 py-2",
                )}
              >
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-[9px] top-5 h-[calc(100%-0.25rem)] w-px",
                      step.status === "complete" ? "bg-accent/40" : "bg-border",
                    )}
                  />
                ) : null}

                <span
                  className={cn(
                    "relative z-10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors duration-200",
                    step.status === "complete" &&
                      "border-accent bg-accent text-accent-foreground",
                    step.status === "current" &&
                      "border-accent bg-surface text-accent ring-2 ring-accent/20",
                    step.status === "upcoming" &&
                      "border-border bg-surface text-muted",
                  )}
                  aria-hidden="true"
                >
                  {step.status === "complete" ? "✓" : index + 1}
                </span>

                <p
                  className={cn(
                    "text-sm",
                    step.status === "current"
                      ? "font-medium text-foreground"
                      : step.status === "complete"
                        ? "text-foreground"
                        : "text-muted",
                  )}
                >
                  {step.label}
                  {step.status === "current" ? (
                    <span className="sr-only"> {t("common.currentStage")}</span>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ol>
      </section>
    </Card>
  );
}
