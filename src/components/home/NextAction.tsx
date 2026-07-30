"use client";

import Link from "next/link";
import { useId } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import type { NextActionContent, UrgencyLevel } from "@/types/journey";
import { cn } from "@/lib/utils";

type NextActionProps = {
  urgency: UrgencyLevel;
  compact?: boolean;
} & (
  | { action: NextActionContent; message?: never }
  | { message: string; action?: never }
);

const urgencyStyles: Record<UrgencyLevel, string> = {
  low: "border-border bg-surface",
  medium: "border-accent/20 bg-accent-subtle/60",
  high: "border-accent/30 bg-accent-subtle",
};

export function NextAction({ urgency, compact = false, ...props }: NextActionProps) {
  const titleId = useId();
  const { t } = useTravellerPreferences();

  return (
    <Card
      className={cn(urgencyStyles[urgency], compact && "shadow-sm")}
      aria-labelledby={titleId}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-accent">
        {t("common.nextAction")}
      </p>

      {"message" in props && props.message ? (
        <p
          id={titleId}
          className="mt-2 text-lg font-semibold leading-snug text-foreground"
        >
          {props.message}
        </p>
      ) : (
        <>
          <h2
            id={titleId}
            className={cn(
              "mt-2 font-semibold text-heading",
              compact ? "text-xl" : "text-lg",
            )}
          >
            {props.action!.title}
          </h2>
          {props.action!.timing ? (
            <p className="mt-2 text-sm font-medium text-foreground">
              {props.action!.timing}
            </p>
          ) : null}
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {props.action!.explanation}
          </p>
          {props.action!.href && props.action!.actionLabel ? (
            <div className="mt-5">
              <Button
                component={Link}
                href={props.action!.href}
                variant={urgency === "high" ? "primary" : "secondary"}
                size="small"
              >
                {props.action!.actionLabel}
              </Button>
            </div>
          ) : null}
        </>
      )}
    </Card>
  );
}
