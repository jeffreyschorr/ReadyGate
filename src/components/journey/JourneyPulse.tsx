"use client";

import { motion } from "framer-motion";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import { motionDuration, motionEase } from "@/lib/motion";
import type { JourneyPulseState } from "@/types/journey";

type JourneyPulseProps = {
  state: JourneyPulseState;
  statusLabel: string;
};

export function JourneyPulse({ state, statusLabel }: JourneyPulseProps) {
  const reducedMotion = useReducedMotion();
  const { t } = useTranslation();

  const pulseConfig = {
    relaxed: {
      label: t("pulse.relaxed.label"),
      badge: t("pulse.relaxed.badge"),
      variant: "success" as const,
    },
    attentive: {
      label: t("pulse.attentive.label"),
      badge: t("pulse.attentive.badge"),
      variant: "warning" as const,
    },
    "action-required": {
      label: t("pulse.actionRequired.label"),
      badge: t("pulse.actionRequired.badge"),
      variant: "danger" as const,
    },
  };

  const config = pulseConfig[state];

  return (
    <motion.section
      key={state}
      aria-label={t("a11y.journeyStatus", { status: config.label })}
      className="flex flex-wrap items-center gap-3"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: motionDuration.stage, ease: motionEase }}
    >
      <StatusBadge label={config.label} variant={config.variant} />
      <p className="text-sm text-muted">{statusLabel}</p>
      <span className="sr-only">{config.badge}</span>
    </motion.section>
  );
}
