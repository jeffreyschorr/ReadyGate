"use client";

import { PageSkeleton } from "@/components/ui/Skeleton";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({ label, className }: LoadingStateProps) {
  const { t } = useTranslation();
  const resolvedLabel = label ?? t("common.loading");

  return (
    <div
      className={cn(className)}
      role="status"
      aria-live="polite"
      aria-label={resolvedLabel}
    >
      <PageSkeleton />
    </div>
  );
}
