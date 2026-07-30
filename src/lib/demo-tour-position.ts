const VIEWPORT_MARGIN = 16;
const TOOLTIP_GAP = 12;
const TOOLTIP_ESTIMATED_HEIGHT = 230;

export type TooltipPlacement = "above" | "below" | "auto";

export type TooltipPosition = {
  top: number;
  left: number;
  width: number;
};

export function getTooltipPosition(
  rect: DOMRect,
  placement: TooltipPlacement = "auto",
  tooltipHeight = TOOLTIP_ESTIMATED_HEIGHT,
): TooltipPosition {
  const tooltipWidth = Math.min(320, window.innerWidth - VIEWPORT_MARGIN * 2);
  const resolvedPlacement = resolvePlacement(rect, placement, tooltipHeight);

  const top =
    resolvedPlacement === "above"
      ? Math.max(VIEWPORT_MARGIN, rect.top - TOOLTIP_GAP - tooltipHeight)
      : Math.min(
          window.innerHeight - VIEWPORT_MARGIN - tooltipHeight,
          rect.bottom + TOOLTIP_GAP,
        );

  const centeredLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
  const left = Math.min(
    Math.max(VIEWPORT_MARGIN, centeredLeft),
    window.innerWidth - tooltipWidth - VIEWPORT_MARGIN,
  );

  return { top, left, width: tooltipWidth };
}

function resolvePlacement(
  rect: DOMRect,
  placement: TooltipPlacement,
  tooltipHeight: number,
): "above" | "below" {
  if (placement === "above" || placement === "below") {
    return placement;
  }

  const spaceBelow = window.innerHeight - rect.bottom - TOOLTIP_GAP - VIEWPORT_MARGIN;
  const spaceAbove = rect.top - TOOLTIP_GAP - VIEWPORT_MARGIN;

  if (spaceBelow >= tooltipHeight) {
    return "below";
  }

  if (spaceAbove >= tooltipHeight) {
    return "above";
  }

  return spaceAbove >= spaceBelow ? "above" : "below";
}

export function getCenteredTooltipPosition(
  tooltipHeight = TOOLTIP_ESTIMATED_HEIGHT,
): TooltipPosition {
  const tooltipWidth = Math.min(320, window.innerWidth - VIEWPORT_MARGIN * 2);

  return {
    top: Math.max(VIEWPORT_MARGIN, window.innerHeight / 2 - tooltipHeight / 2),
    left: Math.max(
      VIEWPORT_MARGIN,
      (window.innerWidth - tooltipWidth) / 2,
    ),
    width: tooltipWidth,
  };
}

export function isDesktopViewport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(min-width: 768px)").matches;
}

export function getStepTooltipPlacement(
  stepId: string,
  placement: TooltipPlacement = "auto",
): TooltipPlacement {
  if (stepId === "utility-actions") {
    return "below";
  }

  if (stepId === "main-nav") {
    return isDesktopViewport() ? "below" : "above";
  }

  return placement;
}

export function shouldScrollToTopForStep(stepId: string): boolean {
  if (stepId === "utility-actions") {
    return true;
  }

  return stepId === "main-nav" && isDesktopViewport();
}

export function getStepSpotlightPadding(stepId: string): number {
  return stepId === "utility-actions" ? 14 : 8;
}
