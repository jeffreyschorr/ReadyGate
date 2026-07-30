"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { settingsNavItems } from "@/config/navigation";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

type SettingsLayoutProps = {
  children: React.ReactNode;
};

const settingsNavKeys = {
  "/settings/account": "navigation.account",
  "/settings/notifications": "navigation.notifications",
  "/settings/preferences": "navigation.travellerPreferences",
} as const;

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside aria-label={t("pages.settings.title")}>
        <nav>
          <ul className="space-y-1">
            {settingsNavItems.map((item) => {
              const active = pathname === item.href;
              const navKey = settingsNavKeys[item.href as keyof typeof settingsNavKeys];

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "bg-accent-subtle font-medium text-foreground ring-1 ring-accent/25"
                        : "text-muted hover:bg-surface hover:text-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {navKey ? t(`${navKey}.label`) : item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div>{children}</div>
    </div>
  );
}
