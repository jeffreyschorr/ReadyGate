"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/i18n/useTranslation";

export function LandingCtaSection() {
  const { t } = useTranslation();

  return (
    <section className="landing-section pb-12 md:pb-14">
      <div className="landing-shell">
        <div className="landing-panel bg-accent-subtle/30 text-center md:text-left">
          <div className="mx-auto md:mx-0">
            <h2 className="landing-section-title">{t("landing.cta.title")}</h2>
            <p className="landing-lead mt-4">{t("landing.cta.description")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button component={Link} href="/home" className="w-full sm:w-auto">
                {t("landing.cta.beginDemo")}
              </Button>
              <Button
                variant="secondary"
                component={Link}
                href="/engineering"
                className="w-full sm:w-auto"
              >
                {t("landing.cta.engineering")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
