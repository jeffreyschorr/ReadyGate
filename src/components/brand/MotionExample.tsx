"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionDuration, motionEase, stageTransition } from "@/lib/motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const states = [
  {
    label: "At airport",
    detail: "Security is your next step. Allow around 10 minutes.",
  },
  {
    label: "After security",
    detail: "You have time for coffee before boarding begins.",
  },
] as const;

export function MotionExample() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const state = states[index];

  return (
    <div className="space-y-4">
      <Card interactive={false} className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.label}
            initial={reducedMotion ? false : stageTransition.initial}
            animate={stageTransition.animate}
            exit={reducedMotion ? undefined : stageTransition.exit}
            transition={{ duration: motionDuration.stage, ease: motionEase }}
          >
            <p className={cn(typography.metadata, "text-accent")}>Stage change</p>
            <p className={cn(typography.cardHeading, "mt-2 text-card-heading")}>
              {state.label}
            </p>
            <p className={cn(typography.bodySm, "mt-2 text-muted")}>{state.detail}</p>
          </motion.div>
        </AnimatePresence>
      </Card>
      <Button
        variant="secondary"
        size="small"
        onClick={() => setIndex((current) => (current === 0 ? 1 : 0))}
      >
        Toggle stage
      </Button>
    </div>
  );
}
