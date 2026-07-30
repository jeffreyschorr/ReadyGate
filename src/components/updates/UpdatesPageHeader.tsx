"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function UpdatesPageHeader() {
  const { t } = useTranslation();

  return (
    <header className="max-w-2xl space-y-4">
      <h1
        className={cn(typography.pageTitle, "text-page-title")}
      >
        {t("updates.title")}
      </h1>
      <p className={cn(typography.body, "text-muted")}>
        {t("updates.subtitle")}
      </p>
    </header>
  );
}
