"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type WhatChangedProps = {
  message: string;
  heading?: string;
};

export function WhatChanged({
  message,
  heading,
}: WhatChangedProps) {
  const { t } = useTranslation();
  const resolvedHeading = heading ?? t("journey.page.sinceLastVisit");

  return (
    <section aria-label={resolvedHeading}>
      <h2 className={cn(typography.cardHeadingSm, "text-muted")}>{resolvedHeading}</h2>
      <p className={cn(typography.bodySm, "mt-2 text-foreground")}>{message}</p>
    </section>
  );
}
