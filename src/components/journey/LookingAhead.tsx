"use client";

import type { LookingAheadEvent } from "@/types/journey";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfacePanel } from "@/components/ui/SurfacePanel";
import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type LookingAheadProps = {
  events: LookingAheadEvent[];
};

export function LookingAhead({ events }: LookingAheadProps) {
  const { t } = useTranslation();
  const sectionLabel = t("journey.page.lookingAhead");

  if (events.length === 0) {
    return (
      <section aria-label={sectionLabel}>
        <SurfacePanel>
          <SectionHeading>{sectionLabel}</SectionHeading>
          <p className={cn(typography.bodySm, "mt-3 text-muted")}>
            {t("journey.page.noUpcomingSteps")}
          </p>
        </SurfacePanel>
      </section>
    );
  }

  return (
    <section aria-label={sectionLabel}>
      <SurfacePanel>
        <SectionHeading>{sectionLabel}</SectionHeading>
        <ul className="mt-5 space-y-3">
          {events.map((event) => (
            <li
              key={event.id}
              className="rounded-lg border border-border/60 bg-background px-4 py-3"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className={cn(typography.label, "text-foreground")}>{event.title}</p>
                <p className={cn(typography.bodySm, "shrink-0 text-muted")}>{event.time}</p>
              </div>
              {event.detail ? (
                <p className={cn(typography.bodySm, "mt-1.5 text-muted")}>{event.detail}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </SurfacePanel>
    </section>
  );
}
