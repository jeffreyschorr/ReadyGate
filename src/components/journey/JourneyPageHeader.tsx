"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type JourneyPageHeaderProps = {
  routeLabel: string;
  tripWindow: string;
};

export function JourneyPageHeader({
  routeLabel,
  tripWindow,
}: JourneyPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="space-y-1">
      <h1 className={cn(typography.pageTitle, "text-page-title")}>
        {t("journey.page.myJourney")}
      </h1>
      <p className={cn(typography.label, "text-lg text-foreground")}>{routeLabel}</p>
      <p className={cn(typography.bodySm, "text-muted")}>{tripWindow}</p>
    </header>
  );
}
