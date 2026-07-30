"use client";

import Image from "next/image";

import { useTranslation } from "@/i18n/useTranslation";

export function LandingHeroMobileQr() {
  const { t } = useTranslation();

  return (
    <div className="mt-8 hidden max-w-xs lg:block">
      <Image
        src="/landing/mobile-demo-qr.png"
        alt={t("landing.hero.mobileQrAlt")}
        width={112}
        height={112}
        unoptimized
        className="rounded-md border border-border bg-white p-1.5"
      />
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {t("landing.hero.mobileQrHint")}
      </p>
    </div>
  );
}
