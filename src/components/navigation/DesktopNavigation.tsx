"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppTourNavTrigger } from "@/components/navigation/AppTourNavTrigger";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NavUtilityActions } from "@/components/navigation/NavUtilityActions";
import { desktopNavItems } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { navLabelForHref } from "@/lib/nav-labels";
import { cn, isPathActive } from "@/lib/utils";

export function DesktopNavigation() {
  const pathname = usePathname();
  const { t } = useTravellerPreferences();
  const primaryNavItems = desktopNavItems.filter((item) => !item.iconOnly);

  return (
    <header className="hidden border-b border-border bg-surface md:block">
      <Container>
        <nav
          aria-label={t("a11y.mainNavigation")}
          className="flex h-16 items-center justify-between gap-3 lg:gap-4"
        >
          <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-6">
            <Link
              href="/"
              className="inline-flex shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={t("a11y.readyGateHome")}
            >
              <BrandLogo variant="lockup" size="sm" />
            </Link>

            <ul
              data-tour="main-nav"
              className="flex h-16 min-w-0 items-stretch gap-3 overflow-x-auto lg:gap-4"
            >
              {primaryNavItems.map((item) => {
                const active = isPathActive(pathname, item.href);
                const label = navLabelForHref(item.href, item.label, t, item.labelKey);

                return (
                  <li key={item.href} className="flex shrink-0">
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex h-full items-center border-b-2 px-0.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        active
                          ? "border-accent font-medium text-accent"
                          : "border-transparent text-muted hover:text-accent/80",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <AppTourNavTrigger variant="desktop" />
            </ul>
          </div>

          <NavUtilityActions />
        </nav>
      </Container>
    </header>
  );
}
