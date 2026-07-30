"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import type { TranslationKey } from "@/i18n/types";
import { scrollToHash } from "@/lib/smooth-scroll";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type FooterLink = {
  key: TranslationKey;
  href: string;
};

const FOOTER_NAV_ITEMS: FooterLink[] = [
  { key: "landing.header.about", href: "#about" },
  { key: "landing.footer.engineering", href: "/engineering" },
  { key: "landing.footer.brand", href: "/brand" },
  { key: "landing.footer.designSystem", href: "/design" },
];

export function LandingFooter() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();
    scrollToHash(href, { reducedMotion });
  };

  const linkClass =
    "text-sm font-medium text-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm";

  return (
    <footer className="border-t border-border bg-surface">
      <div className="landing-shell py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-4">
            <BrandLogo variant="lockup" size="sm" />
            <p className={cn(typography.bodySm, "text-muted")}>
              {t("landing.footer.disclaimer")}
            </p>
            <p className={cn(typography.bodySm, "text-muted")}>
              {t("landing.footer.affiliation")}
            </p>
          </div>

          <nav
            aria-label={t("landing.header.mainNav")}
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {FOOTER_NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={(event) => handleAnchorClick(event, item.href)}
                className={linkClass}
              >
                {t(item.key)}
              </Link>
            ))}
            <Button component={Link} href="/home" size="small" className="min-h-10 px-5">
              {t("landing.header.startDemo")}
            </Button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
