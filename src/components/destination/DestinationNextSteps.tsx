"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslation } from "@/i18n/useTranslation";
import type { DestinationStep } from "@/types/journey";
import { cn } from "@/lib/utils";

type DestinationNextStepsProps = {
  title: string;
  steps: DestinationStep[];
};

export function DestinationNextSteps({
  title,
  steps,
}: DestinationNextStepsProps) {
  const { t } = useTranslation();

  return (
    <section aria-label={title}>
      <SectionHeading>{title}</SectionHeading>
      <ol className="mt-6 space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <li key={step.id} className="relative">
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[15px] top-10 bottom-0 w-px bg-border/70"
                />
              ) : null}

              <div
                className={cn(
                  "relative flex gap-4 pb-8 last:pb-0",
                  step.status === "current" &&
                    "-mx-3 rounded-xl bg-accent-subtle/50 px-3 py-3",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base",
                    step.status === "current" && "bg-accent text-accent-foreground",
                    step.status === "complete" && "bg-accent/10 text-accent",
                    step.status === "upcoming" && "bg-surface text-muted",
                  )}
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p
                      className={cn(
                        "text-base font-medium",
                        step.status === "upcoming"
                          ? "text-muted"
                          : "text-foreground",
                      )}
                    >
                      {step.title}
                      {step.status === "current" ? (
                        <span className="sr-only"> {t("common.currentStep")}</span>
                      ) : null}
                    </p>
                    <p className="text-sm text-muted">{step.estimatedTime}</p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>

              {!isLast ? (
                <span aria-hidden="true" className="sr-only">
                  {t("common.then")}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
