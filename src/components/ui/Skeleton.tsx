"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("skeleton-shimmer rounded-md", className)}
    />
  );
}

export function CardSkeleton() {
  const { t } = useTranslation();

  return (
    <div
      aria-busy="true"
      aria-label={t("pages.loadingContent")}
      className="rounded-xl border border-border/60 bg-surface p-6"
    >
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-4 h-7 w-3/4 max-w-xs" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  const { t } = useTranslation();

  return (
    <div
      aria-busy="true"
      aria-label={t("pages.loadingContent")}
      className="space-y-4"
    >
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-10 w-64 max-w-full" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <HeroSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
