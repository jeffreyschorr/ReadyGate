"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { NavUtilityActions } from "@/components/navigation/NavUtilityActions";
import { Container } from "@/components/ui/Container";
import { useTranslation } from "@/i18n/useTranslation";

export function MobileHeader() {
  const { t } = useTranslation();

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-surface md:hidden"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Container className="flex h-14 items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex min-w-0 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={t("a11y.readyGateHome")}
        >
          <BrandLogo variant="lockup" size="sm" />
        </Link>
        <NavUtilityActions />
      </Container>
    </header>
  );
}
