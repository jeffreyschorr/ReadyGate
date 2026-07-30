"use client";

import Link from "next/link";

import { LandingHeroMobileQr } from "@/components/landing/LandingHeroMobileQr";
import { LandingHeroVisual } from "@/components/landing/LandingHeroVisual";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function LandingHero() {
  const { t } = useTranslation();

  return (
    <section className="landing-section pt-8 pb-10 md:pt-10 md:pb-12">
      <div className="landing-shell">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex max-w-xl flex-col justify-center lg:py-4">
            <p className={cn(typography.metadata, "text-accent")}>
              {t("landing.hero.eyebrow")}
            </p>
            <h1 className="landing-hero-title mt-4">{t("landing.hero.title")}</h1>
            <p className="landing-lead mt-6">
              {t("landing.hero.descriptionBefore")}
              <strong className="font-semibold text-foreground">
                {t("landing.hero.descriptionHighlight")}
              </strong>
              {t("landing.hero.descriptionAfter")}
            </p>
            <p className="landing-lead mt-4">{t("landing.hero.descriptionSecondary")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button component={Link} href="/home" className="w-full sm:w-auto">
                {t("landing.hero.beginDemo")}
              </Button>
              <Button
                variant="secondary"
                component={Link}
                href="/engineering"
                className="w-full sm:w-auto"
              >
                {t("landing.hero.engineering")}
              </Button>
            </div>
            <LandingHeroMobileQr />
          </div>

          <div className="flex justify-center lg:justify-end">
            <LandingHeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
