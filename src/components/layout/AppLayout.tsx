"use client";

import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { MobileHeader } from "@/components/navigation/MobileHeader";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { ScrollRestoration } from "@/components/layout/ScrollRestoration";
import { PageTransition } from "@/components/motion/PageTransition";
import { demoConfig } from "@/config/demo";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-background">
      <ScrollRestoration />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md"
      >
        {t("a11y.skipToContent")}
      </a>
      <DesktopNavigation />
      <MobileHeader />
      <main
        id="main-content"
        className={cn(
          "min-w-0 flex-1 md:pb-0",
          demoConfig.showPanel
            ? "pb-[calc(9rem+env(safe-area-inset-bottom))]"
            : "pb-[calc(4.5rem+env(safe-area-inset-bottom))]",
        )}
      >
        <PageTransition>{children}</PageTransition>
      </main>
      <MobileNavigation />
    </div>
  );
}
