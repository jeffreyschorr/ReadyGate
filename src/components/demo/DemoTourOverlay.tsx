"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { DemoTourStepBody } from "@/components/demo/DemoTourStepBody";
import { FixedUiRoot } from "@/components/layout/FixedUiRoot";
import { Button } from "@/components/ui/Button";
import { DEMO_TOUR_STEPS } from "@/data/demoTourSteps";
import { useDemoTour } from "@/context/DemoTourContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import {
  getCenteredTooltipPosition,
  getStepSpotlightPadding,
  getStepTooltipPlacement,
  getTooltipPosition,
  shouldScrollToTopForStep,
} from "@/lib/demo-tour-position";
import {
  findVisibleTourTarget,
  getTourSpotlightRect,
} from "@/lib/demo-tour-target";
import { cn } from "@/lib/utils";

const TARGET_RETRY_MS = 100;
const TARGET_RETRY_MAX = 30;

export function DemoTourOverlay() {
  const { isActive, stepIndex, stepCount, nextStep, skipTour } = useDemoTour();
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const titleId = useId();
  const bodyId = useId();
  const step = DEMO_TOUR_STEPS[stepIndex];
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const updateLayout = useCallback(() => {
    if (!step) {
      setSpotlightRect(null);
      setTooltipStyle(null);
      return false;
    }

    const target = findVisibleTourTarget(step.id);
    const measuredHeight = tooltipRef.current?.offsetHeight;

    if (!target) {
      setSpotlightRect(null);
      setTooltipStyle(getCenteredTooltipPosition(measuredHeight));
      return false;
    }

    const rect = getTourSpotlightRect(
      target,
      getStepSpotlightPadding(step.id),
    );
    setSpotlightRect(rect);
    setTooltipStyle(
      getTooltipPosition(
        rect,
        getStepTooltipPlacement(step.id, step.placement ?? "auto"),
        measuredHeight,
      ),
    );
    return true;
  }, [step]);

  useLayoutEffect(() => {
    if (!isActive || !step) {
      setSpotlightRect(null);
      setTooltipStyle(null);
      return;
    }

    let scrollTimer: number | undefined;

    if (shouldScrollToTopForStep(step.id)) {
      window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "auto" : "smooth" });
      scrollTimer = window.setTimeout(() => {
        if (step.id === "utility-actions") {
          const target = findVisibleTourTarget(step.id);
          target?.scrollIntoView({
            block: "start",
            inline: "nearest",
            behavior: reducedMotion ? "auto" : "smooth",
          });
        }
        updateLayout();
      }, reducedMotion ? 0 : 400);
      return () => {
        if (scrollTimer) {
          window.clearTimeout(scrollTimer);
        }
      };
    }

    const target = findVisibleTourTarget(step.id);

    if (
      target &&
      step.id !== "demo-panel" &&
      step.id !== "main-nav" &&
      step.id !== "utility-actions"
    ) {
      target.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }

    updateLayout();

    return () => {
      if (scrollTimer) {
        window.clearTimeout(scrollTimer);
      }
    };
  }, [isActive, reducedMotion, step, stepIndex, updateLayout]);

  useEffect(() => {
    if (!isActive || !step) {
      return;
    }

    let attempts = 0;
    let retryTimer: number | undefined;

    const tryLayout = () => {
      const found = updateLayout();

      if (!found && attempts < TARGET_RETRY_MAX) {
        attempts += 1;
        retryTimer = window.setTimeout(tryLayout, TARGET_RETRY_MS);
      }
    };

    tryLayout();

    const handleChange = () => updateLayout();

    window.addEventListener("resize", handleChange);
    window.addEventListener("scroll", handleChange, true);

    return () => {
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
      window.removeEventListener("resize", handleChange);
      window.removeEventListener("scroll", handleChange, true);
    };
  }, [isActive, step, stepIndex, updateLayout]);

  useEffect(() => {
    if (!isActive || !step || !tooltipRef.current) {
      return;
    }

    const tooltip = tooltipRef.current;
    const observer = new ResizeObserver(() => {
      updateLayout();
    });

    observer.observe(tooltip);

    return () => observer.disconnect();
  }, [isActive, step, stepIndex, updateLayout]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        skipTour();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, skipTour]);

  if (!isActive || !step || !tooltipStyle) {
    return null;
  }

  const isLastStep = stepIndex >= stepCount - 1;

  return (
    <FixedUiRoot>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        aria-label={t("demo.tour.dialogLabel")}
        className="pointer-events-auto fixed inset-0 z-[110]"
      >
        {spotlightRect ? (
          <div
            className="absolute rounded-lg ring-2 ring-white/90"
            style={{
              top: spotlightRect.top,
              left: spotlightRect.left,
              width: spotlightRect.width,
              height: spotlightRect.height,
              boxShadow: "0 0 0 9999px rgba(15, 23, 42, 0.62)",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-900/62" aria-hidden="true" />
        )}

        <div
          ref={tooltipRef}
          className={cn(
            "absolute rounded-xl border border-border bg-surface p-4 shadow-xl",
            !reducedMotion && "transition-[top,left] duration-200 ease-out",
          )}
          style={{
            top: tooltipStyle.top,
            left: tooltipStyle.left,
            width: tooltipStyle.width,
          }}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            {t("demo.tour.stepCounter", {
              current: stepIndex + 1,
              total: stepCount,
            })}
          </p>
          <h2 id={titleId} className="mt-2 text-lg font-semibold text-heading">
            {t(step.titleKey)}
          </h2>
          <p id={bodyId} className="mt-2 text-sm leading-relaxed text-muted">
            <DemoTourStepBody stepId={step.id} bodyKey={step.bodyKey} />
          </p>
          <div
            className={cn(
              "mt-4 flex items-center gap-3",
              isLastStep ? "justify-end" : "justify-between",
            )}
          >
            {!isLastStep ? (
              <button
                type="button"
                onClick={skipTour}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {t("demo.tour.skip")}
              </button>
            ) : null}
            <Button type="button" size="small" onClick={nextStep}>
              {isLastStep ? t("demo.tour.done") : t("demo.tour.next")}
            </Button>
          </div>
        </div>
      </div>
    </FixedUiRoot>
  );
}
