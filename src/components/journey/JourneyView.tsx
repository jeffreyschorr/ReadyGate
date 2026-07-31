"use client";

import { JourneyHealth } from "@/components/journey/JourneyHealth";
import { JourneyHeroBanner } from "@/components/journey/JourneyHeroBanner";
import { JourneyMilestoneTimeline } from "@/components/journey/JourneyMilestoneTimeline";
import { JourneyPageHeader } from "@/components/journey/JourneyPageHeader";
import { JourneyPulse } from "@/components/journey/JourneyPulse";
import { LookingAhead } from "@/components/journey/LookingAhead";
import { StageViewShell } from "@/components/layout/StageViewShell";
import { StageStaggerItem } from "@/components/motion/StageTransition";
import { SurfacePanel } from "@/components/ui/SurfacePanel";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardSkeleton, HeroSkeleton } from "@/components/ui/Skeleton";
import { getDisruptionUpdates } from "@/data/disruptionContent";
import {
  getJourneyMilestones,
  getLookingAheadEvents,
} from "@/data/journeyMilestones";
import { getRefinementContent } from "@/data/refinementContent";
import { useEffectiveJourneyDisplay } from "@/hooks/useEffectiveJourneyDisplay";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { pageLayout } from "@/lib/layout";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function JourneyView() {
  const { stage, journey, content, disruptionActive } = useJourneyDemo();
  const { display, formatters, t } = useTravellerPreferences();
  const effectiveDisplay = useEffectiveJourneyDisplay();
  const milestones = getJourneyMilestones(stage, effectiveDisplay, t);
  const refinement = getRefinementContent(stage, effectiveDisplay, t);
  const lookingAhead = getLookingAheadEvents(stage, effectiveDisplay, t);
  const routeLabel = `${journey.flight.origin.city} → ${journey.flight.destination.city}`;
  const disruptionUpdates = disruptionActive
    ? getDisruptionUpdates(display, t, formatters.formatTime)
    : [];

  return (
    <StageViewShell
      stage={stage}
      simulateLoading={false}
      loadingFallback={
        <>
          <HeroSkeleton />
          <CardSkeleton />
        </>
      }
    >
      <StageStaggerItem>
        <JourneyPageHeader routeLabel={routeLabel} tripWindow={journey.tripWindowLabel} />
      </StageStaggerItem>

      <StageStaggerItem>
        <JourneyPulse state={content.pulse} statusLabel={content.journeyStatus} />
      </StageStaggerItem>

      <StageStaggerItem>
        <JourneyHeroBanner journey={journey} />
      </StageStaggerItem>

      <StageStaggerItem
        className={`grid ${pageLayout.grid} lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]`}
      >
        <Card interactive={false} className="min-w-0 border-border/80 shadow-sm">
          <SectionHeading>{t("journey.page.tripProgress")}</SectionHeading>
          <p className={cn(typography.bodySm, "mt-2 text-muted")}>
            {t("journey.page.tripProgressSubtitle")}
          </p>
          <div className="mt-6 border-t border-border/60 pt-6">
            <JourneyMilestoneTimeline milestones={milestones} />
          </div>
        </Card>

        <aside className={`min-w-0 ${pageLayout.asideStack}`}>
          <JourneyHealth items={refinement.health} />
          <SurfacePanel
            className={cn(
              disruptionActive && "border-accent/25 bg-accent-subtle/25",
            )}
          >
            <SectionHeading>{t("journey.page.sinceLastVisit")}</SectionHeading>
            {disruptionUpdates.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {disruptionUpdates.map((update) => (
                  <li
                    key={update.id}
                    className="rounded-lg border border-border/60 bg-background px-3 py-3"
                  >
                    <p className={cn(typography.label, "text-foreground")}>
                      {update.title}
                    </p>
                    <p className={cn(typography.bodySm, "mt-1 text-muted")}>
                      {update.message}
                    </p>
                    <p className={cn(typography.bodySm, "mt-1.5 text-muted/80")}>
                      {update.relativeTime}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={cn(typography.bodySm, "mt-2 text-muted")}>
                {t("journey.page.sectionUpdatesHint")}
              </p>
            )}
          </SurfacePanel>
          <LookingAhead events={lookingAhead} />
        </aside>
      </StageStaggerItem>
    </StageViewShell>
  );
}
