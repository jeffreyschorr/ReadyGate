"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { PresentationShell } from "@/components/presentation/PresentationShell";
import { presentationPrinciples } from "@/data/presentationContent";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import { motionDuration, motionEase, staggerContainer, staggerItem } from "@/lib/motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const principleKeys = [
  "presentation.principles.cutNoise",
  "presentation.principles.leadNextStep",
  "presentation.principles.sayWhy",
] as const;

const highlightKeys = [
  "presentation.highlights.stageContent",
  "presentation.highlights.replayDay",
  "presentation.highlights.flightUpdates",
  "presentation.highlights.accessibility",
  "presentation.highlights.componentLibrary",
  "presentation.highlights.responsive",
] as const;

export function PresentationView() {
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
    <PresentationShell
      footer={
        <footer className="mt-12 max-w-2xl border-t border-border pt-6 text-xs leading-relaxed text-muted">
          {t("presentation.disclaimer")}
        </footer>
      }
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -6 : 0 }}
        transition={{ duration: motionDuration.page, ease: motionEase }}
        className="space-y-12 sm:space-y-14"
      >
        <header className="space-y-6">
          <div className="space-y-3">
            <h1 className="sr-only">{t("meta.siteName")}</h1>
            <BrandLogo variant="lockup" size="lg" priority />
            <p className={cn(typography.body, "text-lg text-muted sm:text-xl")}>
              {t("presentation.tagline")}
            </p>
          </div>

          <p className={cn(typography.metadata, "inline-block tracking-[0.14em] text-muted")}>
            {t("presentation.productConcept")}
          </p>

          <div className="space-y-1 border-t border-border pt-6 text-sm leading-relaxed">
            <p className="text-foreground">{t("presentation.conceptFocus")}</p>
          </div>
        </header>

        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-[1.05rem] sm:leading-7">
          {t("presentation.intro")}
        </p>

        <motion.ul
          variants={reducedMotion ? undefined : staggerContainer}
          initial={reducedMotion ? false : "initial"}
          animate="animate"
          className="grid gap-8 sm:grid-cols-3 sm:gap-6"
          aria-label={t("a11y.productPrinciples")}
        >
          {presentationPrinciples.map(({ icon: Icon }, index) => (
            <motion.li
              key={principleKeys[index]}
              variants={reducedMotion ? undefined : staggerItem}
              className="space-y-3"
            >
              <div
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-accent"
              >
                <Icon sx={{ fontSize: 20 }} />
              </div>
              <p className="text-sm font-medium leading-snug text-foreground">
                {t(principleKeys[index])}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <Card interactive={false} className="max-w-2xl">
          <h2 className={cn(typography.cardHeadingSm, "text-card-heading")}>
            {t("presentation.inThisPrototype")}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {highlightKeys.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm text-muted">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-muted"
                />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            onClick={handleBegin}
            aria-label={t("a11y.startDemo")}
            className="w-full sm:w-auto"
          >
            {t("presentation.startDemo")}
          </Button>
          <Button
            variant="secondary"
            component={Link}
            href="/engineering"
            className="w-full sm:w-auto"
          >
            {t("presentation.engineeringDecisions")}
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
