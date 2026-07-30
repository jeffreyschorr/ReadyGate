"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { FlightDisplayStatus } from "@/types/journey";

type FlightPageHeaderProps = {
  flightNumber: string;
  routeLabel: string;
  dateLabel: string;
  displayStatus: FlightDisplayStatus;
};

const statusVariantMap: Record<
  FlightDisplayStatus,
  "success" | "warning" | "danger" | "neutral" | "info"
> = {
  Scheduled: "neutral",
  "Check-in Open": "info",
  Boarding: "warning",
  "In Flight": "info",
  Landed: "success",
};

export function FlightPageHeader({
  flightNumber,
  routeLabel,
  dateLabel,
  displayStatus,
}: FlightPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="max-w-2xl space-y-4">
      <p className={cn(typography.metadata, "text-muted")}>{t("navigation.flight")}</p>
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className={cn(typography.pageTitle, "text-page-title")}>
            {flightNumber.replace(/\s/g, "")}
          </h1>
          <StatusBadge
            label={displayStatus}
            variant={statusVariantMap[displayStatus]}
          />
        </div>
        <p className={cn(typography.label, "text-lg text-foreground")}>{routeLabel}</p>
        <p className={cn(typography.bodySm, "text-muted")}>{dateLabel}</p>
      </div>
    </header>
  );
}
