"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import type { JourneyMilestone } from "@/types/journey";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import { motionDuration, motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type JourneyMilestoneTimelineProps = {
  milestones: JourneyMilestone[];
};

export function JourneyMilestoneTimeline({
  milestones,
}: JourneyMilestoneTimelineProps) {
  const reducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const currentMilestoneId =
    milestones.find((milestone) => milestone.status === "current")?.id ??
    milestones[0]?.id;

  const [expandedId, setExpandedId] = useState<string | null>(currentMilestoneId);

  useEffect(() => {
    setExpandedId(currentMilestoneId);
  }, [currentMilestoneId]);

  const statusLabels = {
    complete: t("status.milestone.complete"),
    current: t("status.milestone.current"),
    upcoming: t("status.milestone.upcoming"),
  } as const;

  return (
    <section aria-label={t("a11y.journeyMilestones")}>
      <h2 className="sr-only">{t("a11y.journeyTimeline")}</h2>
      <ol className="space-y-0">
        {milestones.map((milestone, index) => {
          const isExpanded = expandedId === milestone.id;
          const isLast = index === milestones.length - 1;

          return (
            <li
              key={milestone.id}
              className={cn(
                "pb-6 last:pb-0",
                !isLast && "mb-6 border-b border-border/60 last:mb-0 last:border-b-0",
              )}
            >
              <div
                className={cn(
                  "relative rounded-xl border border-transparent",
                  milestone.status === "current" &&
                    "border-accent/20 bg-accent-subtle/50 px-4 py-4 -mx-1",
                )}
              >
                <button
                  type="button"
                  className="flex w-full items-start gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-expanded={isExpanded}
                  aria-controls={`milestone-panel-${milestone.id}`}
                  id={`milestone-trigger-${milestone.id}`}
                  onClick={() =>
                    setExpandedId((current) =>
                      current === milestone.id ? null : milestone.id,
                    )
                  }
                >
                  <span
                    className={cn(
                      "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                      milestone.status === "complete" &&
                        "border-accent/50 bg-accent/10 text-accent",
                      milestone.status === "current" &&
                        "border-accent bg-accent text-accent-foreground",
                      milestone.status === "upcoming" &&
                        "border-border bg-surface text-muted",
                    )}
                    aria-hidden="true"
                  >
                    {milestone.status === "complete" ? "✓" : index + 1}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span
                        className={cn(
                          "text-base font-medium",
                          milestone.status === "upcoming"
                            ? "text-muted"
                            : "text-foreground",
                        )}
                      >
                        {milestone.title}
                      </span>
                      <span className="text-sm text-muted">{milestone.time}</span>
                    </span>
                    <span className="mt-1.5 flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs font-medium uppercase tracking-wide",
                          milestone.status === "current" && "text-accent",
                          milestone.status === "complete" && "text-muted",
                          milestone.status === "upcoming" && "text-muted",
                        )}
                      >
                        {statusLabels[milestone.status]}
                      </span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted">
                      {milestone.description}
                    </span>
                  </span>

                  <ExpandMoreIcon
                    aria-hidden="true"
                    className={cn(
                      "mt-1 shrink-0 text-muted transition-transform",
                      isExpanded && "rotate-180",
                    )}
                    fontSize="small"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded ? (
                    <motion.div
                      id={`milestone-panel-${milestone.id}`}
                      role="region"
                      aria-labelledby={`milestone-trigger-${milestone.id}`}
                      className="ml-10 overflow-hidden border-t border-border/60 pt-4"
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: motionDuration.expand, ease: motionEase }}
                    >
                      <h3 className="text-sm font-medium text-heading">{t("journey.page.moreDetail")}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {milestone.whyItMatters}
                      </p>

                      <dl className="mt-5 space-y-4">
                        {milestone.details.map((detail) => (
                          <div key={`${milestone.id}-${detail.label}`}>
                            <dt className="text-sm text-muted">{detail.label}</dt>
                            <dd className="mt-1 text-base font-medium text-foreground">
                              {detail.value}
                            </dd>
                            {detail.detail ? (
                              <dd className="mt-0.5 text-sm text-muted">
                                {detail.detail}
                              </dd>
                            ) : null}
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
