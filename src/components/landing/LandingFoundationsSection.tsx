"use client";

import { Card } from "@/components/ui/Card";
import { useTranslation } from "@/i18n/useTranslation";
import type { TranslationKey } from "@/i18n/types";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const FOUNDATION_KEYS = [
  "nextjs",
  "react",
  "typescript",
  "tailwind",
  "accessibility",
  "i18n",
  "preferences",
  "journeyEngine",
] as const;

export function LandingFoundationsSection() {
  const { t } = useTranslation();

  return (
    <section className="landing-section-tight bg-background">
      <div className="landing-shell">
        <h2 className="landing-section-title">{t("landing.foundations.title")}</h2>
        <p className={cn("landing-lead mt-4")}>{t("landing.foundations.intro")}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FOUNDATION_KEYS.map((key) => (
            <Card key={key} interactive={false} className="h-full">
              <h3 className={cn(typography.cardHeading, "text-heading")}>
                {t(`landing.foundations.${key}.title` as TranslationKey)}
              </h3>
              <p className={cn(typography.bodySm, "mt-2 text-muted")}>
                {t(`landing.foundations.${key}.copy` as TranslationKey)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
