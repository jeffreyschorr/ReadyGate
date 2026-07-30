"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useDisruptionActive } from "@/hooks/useDisruptionActive";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import { disruptionEmphasisClass } from "@/lib/disruption-highlight";
import { typography } from "@/lib/typography";
import { motionDuration, motionEase } from "@/lib/motion";
import type { HealthStatus, JourneyHealthItem } from "@/types/journey";
import { cn } from "@/lib/utils";

type JourneyHealthProps = {
  items: JourneyHealthItem[];
};

export function JourneyHealth({ items }: JourneyHealthProps) {
  const reducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const disruptionActive = useDisruptionActive();

  const statusConfig: Record<
    HealthStatus,
    { dot: string; label: string; text: string }
  > = {
    ready: {
      dot: "bg-success",
      label: t("status.health.ready"),
      text: "text-success",
    },
    attention: {
      dot: "bg-warning",
      label: t("status.health.attention"),
      text: "text-warning",
    },
    pending: {
      dot: "bg-border",
      label: t("status.health.pending"),
      text: "text-muted",
    },
  };

  return (
    <Card aria-label={t("a11y.journeyHealthOverview")}>
      <SectionHeading>{t("journey.page.journeyHealth")}</SectionHeading>
      <p className={cn(typography.bodySm, "mt-1 text-muted")}>
        {t("journey.page.journeyHealthSubtitle")}
      </p>

      <ul className="mt-5 space-y-3">
        {items.map((item, index) => {
          const config = statusConfig[item.status];

          return (
            <motion.li
              key={item.id}
              className="flex items-start gap-3 rounded-lg px-1 py-1"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: motionDuration.stage,
                ease: motionEase,
                delay: reducedMotion ? 0 : index * 0.04,
              }}
            >
              <span
                className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", config.dot)}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <span className={cn("text-xs font-medium", config.text)}>
                    {config.label}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-0.5 text-sm",
                    disruptionActive && item.id === "flight"
                      ? disruptionEmphasisClass
                      : "text-muted",
                  )}
                >
                  {item.detail}
                </p>
              </div>
              <span className="sr-only">
                {item.label}: {config.label}. {item.detail}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </Card>
  );
}
