"use client";

import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";

import { Card } from "@/components/ui/Card";
import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    key: "adaptive" as const,
    icon: TimelineOutlinedIcon,
    accent: "text-accent bg-accent-subtle",
  },
  {
    key: "personalised" as const,
    icon: TranslateOutlinedIcon,
    accent: "text-info bg-info-subtle",
  },
  {
    key: "focused" as const,
    icon: SignpostOutlinedIcon,
    accent: "text-heading bg-background",
  },
] as const;

export function LandingGlanceSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="landing-section-tight scroll-mt-20">
      <div className="landing-shell">
        <div className="landing-panel">
          <h2 className="landing-section-title">{t("landing.glance.title")}</h2>
          <p className={cn("landing-lead mt-4")}>{t("landing.glance.intro")}</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ key, icon: Icon, accent }) => (
              <Card key={key} interactive={false} className="h-full">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
                      accent,
                    )}
                    aria-hidden="true"
                  >
                    <Icon sx={{ fontSize: 22 }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className={cn(typography.cardHeading, "text-heading")}>
                      {t(`landing.glance.${key}.title`)}
                    </h3>
                    <p className={cn(typography.bodySm, "mt-1.5 text-muted")}>
                      {t(`landing.glance.${key}.copy`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
