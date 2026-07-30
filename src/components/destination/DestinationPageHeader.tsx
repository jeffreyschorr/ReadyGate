"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type DestinationPageHeaderProps = {
  city: string;
  tagline: string;
};

export function DestinationPageHeader({
  city,
  tagline,
}: DestinationPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="max-w-2xl space-y-4">
      <p className={cn(typography.metadata, "text-muted")}>{t("navigation.destination")}</p>
      <h1 className={cn(typography.pageTitle, "text-page-title")}>{city}</h1>
      <p className={cn(typography.body, "text-muted")}>{tagline}</p>
    </header>
  );
}
