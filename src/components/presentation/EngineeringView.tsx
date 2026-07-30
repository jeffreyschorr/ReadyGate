"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PresentationBackLink } from "@/components/presentation/PresentationBackLink";
import { PresentationShell } from "@/components/presentation/PresentationShell";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import { motionDuration, motionEase } from "@/lib/motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const engineeringKeys = [
  "presentation.engineering.nextjs",
  "presentation.engineering.typescript",
  "presentation.engineering.muiTailwind",
  "presentation.engineering.framerMotion",
  "presentation.engineering.componentDriven",
  "presentation.engineering.mockData",
] as const;

export function EngineeringView() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const [isExiting, setIsExiting] = useState(false);

  const handleBegin = () => {
    if (reducedMotion) {
      router.push("/home");
      return;
    }

    setIsExiting(true);
    window.setTimeout(() => router.push("/home"), motionDuration.page * 1000);
  };

  return (
    <PresentationShell compact>
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -6 : 0 }}
        transition={{ duration: motionDuration.page, ease: motionEase }}
        className="flex max-h-[calc(100vh-5rem)] flex-col gap-6 sm:gap-8"
      >
        <header className="space-y-3">
          <PresentationBackLink />
          <div className="space-y-1">
            <h1
              className={cn(typography.pageTitle, "text-page-title")}
            >
              {t("presentation.engineeringDecisions")}
            </h1>
            <p className={cn(typography.bodySm, "max-w-xl text-muted")}>
              {t("presentation.howBuilt")}
            </p>
          </div>
        </header>

        <Card interactive={false} className="overflow-hidden">
          <ul className="divide-y divide-border">
            {engineeringKeys.map((key) => (
              <li key={key} className="grid gap-1 px-0 py-3 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:py-3.5">
                <p className="text-sm font-medium text-foreground">
                  {t(`${key}.title` as "presentation.engineering.nextjs.title")}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`${key}.detail` as "presentation.engineering.nextjs.detail")}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={handleBegin} aria-label={t("a11y.startDemo")} className="w-full sm:w-auto">
            {t("presentation.startDemo")}
          </Button>
          <Button
            variant="secondary"
            component={Link}
            href="/"
            className="w-full sm:w-auto"
          >
            {t("presentation.backToIntroduction")}
          </Button>
          <Button
            variant="ghost"
            component={Link}
            href="/brand"
            className="w-full sm:w-auto"
          >
            {t("presentation.brandGuide")}
          </Button>
        </div>
      </motion.div>
    </PresentationShell>
  );
}
