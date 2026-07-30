"use client";

import CheckIcon from "@mui/icons-material/Check";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslation } from "@/i18n/useTranslation";
import type { FlightTimelineStep } from "@/types/journey";
import { cn } from "@/lib/utils";

type FlightTimelineStripProps = {
  steps: FlightTimelineStep[];
  prominent?: boolean;
};

function StepMarker({
  status,
  prominent,
}: {
  status: FlightTimelineStep["status"];
  prominent: boolean;
}) {
  const size = prominent ? "h-6 w-6" : "h-5 w-5";

  if (status === "complete") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground",
          size,
        )}
      >
        <CheckIcon sx={{ fontSize: prominent ? 16 : 14 }} />
      </span>
    );
  }

  if (status === "current") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-accent bg-surface ring-2 ring-accent/20",
          size,
        )}
      >
        <span className={cn("rounded-full bg-accent", prominent ? "h-2 w-2" : "h-1.5 w-1.5")} />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative z-10 shrink-0 rounded-full border-2 border-border bg-surface",
        size,
      )}
    />
  );
}

export function FlightTimelineStrip({
  steps,
  prominent = false,
}: FlightTimelineStripProps) {
  const { t } = useTranslation();
  const currentStep = steps.find((step) => step.status === "current");
  const nextStep = steps.find((step) => step.status === "upcoming");

  const content = (
    <>
      <div
        className={cn(
          "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
          prominent ? "mb-4" : "mb-3",
        )}
      >
        <SectionHeading className={prominent ? "text-foreground" : undefined}>
          {t("a11y.flightProgress")}
        </SectionHeading>
        {prominent && currentStep ? (
          <p className="shrink-0 text-sm font-medium text-accent">{currentStep.label}</p>
        ) : prominent && nextStep ? (
          <p className="shrink-0 text-sm text-muted">
            {t("format.flightTimelineNext", { step: nextStep.label })}
          </p>
        ) : null}
      </div>

      <div className="min-w-0 w-full max-w-full overflow-hidden">
        <ol className="grid w-full min-w-0 grid-cols-6 gap-0 sm:flex sm:overflow-visible">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const previousStep = steps[index - 1];
            const nextStep = steps[index + 1];
            const previousComplete = previousStep?.status === "complete";
            const segmentComplete = step.status === "complete";
            const accentLeftSegment =
              index > 0 &&
              previousComplete &&
              (step.status === "current" || step.status === "complete");
            const accentRightSegment =
              !isLast &&
              segmentComplete &&
              (nextStep?.status === "current" || nextStep?.status === "complete");

            return (
              <li
                key={step.id}
                className="flex min-w-0 flex-col items-stretch sm:w-auto sm:min-w-0 sm:flex-1"
              >
                <div
                  className={cn(
                    "relative flex w-full items-center justify-center",
                    prominent ? "h-6" : "h-5",
                  )}
                >
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-1/2 left-0 h-0.5 w-1/2 -translate-y-1/2",
                        accentLeftSegment ? "bg-accent" : "bg-border",
                      )}
                    />
                  ) : null}
                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-1/2 right-0 h-0.5 w-1/2 -translate-y-1/2",
                        accentRightSegment ? "bg-accent" : "bg-border",
                      )}
                    />
                  ) : null}
                  <StepMarker status={step.status} prominent={prominent} />
                </div>
                <p
                  className={cn(
                    "mt-2 px-0.5 pb-0.5 text-center text-[10px] leading-tight font-medium sm:px-0.5 sm:pb-0 sm:text-xs",
                    prominent && "sm:text-sm",
                    step.status === "current" && "font-semibold text-accent",
                    step.status === "complete" && "text-foreground",
                    step.status === "upcoming" && "text-muted",
                  )}
                >
                  {step.label}
                  {step.status === "current" ? (
                    <span className="sr-only"> {t("common.current")}</span>
                  ) : null}
                  {step.status === "complete" ? (
                    <span className="sr-only"> {t("status.milestone.complete")}</span>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );

  if (prominent) {
    return (
      <Card
        interactive={false}
        className="min-w-0 max-w-full overflow-hidden border-accent/15 bg-surface shadow-sm [&_.MuiCardContent-root]:min-w-0"
      >
        <section aria-label={t("a11y.flightProgress")} className="min-w-0 max-w-full">
          {content}
        </section>
      </Card>
    );
  }

  return (
    <section aria-label={t("a11y.flightProgress")} className="min-w-0 max-w-full overflow-hidden">
      {content}
    </section>
  );
}
