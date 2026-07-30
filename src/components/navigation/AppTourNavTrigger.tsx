"use client";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import { demoConfig } from "@/config/demo";
import { useDemoTour } from "@/context/DemoTourContext";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

type AppTourNavTriggerProps = {
  variant: "desktop" | "mobile";
};

export function AppTourNavTrigger({ variant }: AppTourNavTriggerProps) {
  const { startTour } = useDemoTour();
  const { t } = useTranslation();

  if (!demoConfig.showPanel) {
    return null;
  }

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={startTour}
        aria-label={t("a11y.startAppTour")}
        className={cn(
          "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-0.5 py-1 text-[10px] font-medium text-muted transition-colors",
          "hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        )}
      >
        <HelpOutlineOutlinedIcon sx={{ fontSize: 22 }} aria-hidden="true" />
        <span className="max-w-full truncate leading-snug">{t("navigation.appTour")}</span>
      </button>
    );
  }

  return (
    <li className="flex shrink-0 items-center">
      <button
        type="button"
        onClick={startTour}
        aria-label={t("a11y.startAppTour")}
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
          "bg-accent text-accent-foreground hover:bg-accent/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        {t("navigation.appTour")}
      </button>
    </li>
  );
}
