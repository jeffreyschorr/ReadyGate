"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ProfileMenu } from "@/components/navigation/ProfileMenu";
import { NavNotificationBadge } from "@/components/navigation/NavNotificationBadge";
import {
  desktopNavIconClassName,
  desktopNavIconSize,
} from "@/components/navigation/desktop-nav-icon-styles";
import { desktopNavItems } from "@/config/navigation";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { navLabelForHref } from "@/lib/nav-labels";
import { isPathActive, isSettingsAreaActive } from "@/lib/utils";

export function NavUtilityActions() {
  const pathname = usePathname();
  const { t } = useTravellerPreferences();
  const { updatesBadgeCount } = useJourneyDemo();
  const utilityNavItems = desktopNavItems.filter((item) => item.iconOnly);

  return (
    <div className="flex shrink-0 items-center gap-0.5">
      {utilityNavItems.map((item) => {
        const active =
          item.href === "/settings/preferences"
            ? isSettingsAreaActive(pathname)
            : isPathActive(pathname, item.href);
        const label = navLabelForHref(item.href, item.label, t, item.labelKey);
        const Icon = item.icon;

        if (!Icon) {
          return null;
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={
              item.href === "/notifications" && updatesBadgeCount > 0
                ? `${label} (${updatesBadgeCount})`
                : label
            }
            aria-current={active ? "page" : undefined}
            className={`relative ${desktopNavIconClassName(active)}`}
          >
            <Icon sx={{ fontSize: desktopNavIconSize }} aria-hidden="true" />
            {item.href === "/notifications" ? (
              <NavNotificationBadge count={updatesBadgeCount} />
            ) : null}
          </Link>
        );
      })}
      <ProfileMenu />
    </div>
  );
}
