"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionDuration, motionEase } from "@/lib/motion";
import type { CountdownContent } from "@/types/journey";

type CountdownCardProps = {
  countdown: CountdownContent;
};

export function CountdownCard({ countdown }: CountdownCardProps) {
  const reducedMotion = useReducedMotion();

  const content = (
    <>
      <p className="text-sm font-medium text-accent">{countdown.label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
        {countdown.display}
      </p>
    </>
  );

  return (
    <Card
      className="border-accent/20 bg-accent-subtle/40"
      aria-live="polite"
      aria-label={`${countdown.label} ${countdown.display}`}
    >
      {reducedMotion ? (
        content
      ) : (
        <motion.div
          key={`${countdown.label}-${countdown.display}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration.stage, ease: motionEase }}
        >
          {content}
        </motion.div>
      )}
    </Card>
  );
}
