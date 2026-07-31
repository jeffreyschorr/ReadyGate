"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppTourNavTrigger } from "@/components/navigation/AppTourNavTrigger";
import { NavNotificationBadge } from "@/components/navigation/NavNotificationBadge";
import { FixedUiRoot } from "@/components/layout/FixedUiRoot";
import { mobileNavItems } from "@/config/navigation";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { navLabelForHref } from "@/lib/nav-labels";
import { cn, isPathActive } from "@/lib/utils";

export function MobileNavigation() {
  const pathname = usePathname();
  const { t } = useTravellerPreferences();
  const { flightBadgeCount } = useJourneyDemo();

  return (
    <FixedUiRoot>
      <nav
        aria-label={t("a11y.mobileNavigation")}
        data-tour="main-nav"
        className="pointer-events-auto absolute inset-x-0 bottom-0 w-full max-w-full border-t border-border bg-surface md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex h-14 w-full">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const active = isPathActive(pathname, item.href);
            const label = navLabelForHref(item.href, item.label, t, item.labelKey);
            const showFlightBadge = item.href === "/flight" && flightBadgeCount > 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-label={
                  showFlightBadge ? `${label} (${flightBadgeCount})` : label
                }
                className={cn(
                  "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-0.5 py-1 text-[10px] font-medium transition-colors",
                  active ? "text-accent" : "text-muted",
                )}
              >
                {Icon ? (
                  <span className="relative inline-flex shrink-0 p-px">
                    <Icon sx={{ fontSize: 22 }} aria-hidden="true" />
                    {showFlightBadge ? (
                      <NavNotificationBadge count={flightBadgeCount} size="compact" />
                    ) : null}
                  </span>
                ) : null}
                <span className="max-w-full truncate leading-snug">{label}</span>
              </Link>
            );
          })}
          <AppTourNavTrigger variant="mobile" />
        </div>
      </nav>
    </FixedUiRoot>
  );
}
