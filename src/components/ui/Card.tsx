"use client";

import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { CardProps as MuiCardProps } from "@mui/material/Card";
import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cardHover, motionDuration, motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CardProps = MuiCardProps & {
  padding?: "none" | "default";
  interactive?: boolean;
};

export function Card({
  children,
  className,
  padding = "default",
  interactive = true,
  ...props
}: CardProps) {
  const reducedMotion = useReducedMotion();

  const fillsHeight = Boolean(className?.includes("h-full"));

  const card = (
    <MuiCard
      className={cn(
        "min-w-0 max-w-full bg-surface transition-shadow duration-200",
        fillsHeight && "flex h-full flex-col",
        className,
      )}
      {...props}
    >
      {padding === "none" ? (
        children
      ) : (
        <CardContent
          className={cn("p-6 last:pb-6", fillsHeight && "flex flex-1 flex-col")}
        >
          {children}
        </CardContent>
      )}
    </MuiCard>
  );

  if (!interactive || reducedMotion) {
    return card;
  }

  return (
    <motion.div
      whileHover={cardHover}
      transition={{ duration: motionDuration.micro, ease: motionEase }}
      className={cn(
        "min-w-0 max-w-full overflow-hidden rounded-lg",
        fillsHeight && "h-full",
      )}
    >
      {card}
    </motion.div>
  );
}
