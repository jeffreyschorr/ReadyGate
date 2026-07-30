"use client";

import { JourneyPageHeader } from "@/components/journey/JourneyPageHeader";
import { JourneyHealth } from "@/components/journey/JourneyHealth";
import { JourneyMilestoneTimeline } from "@/components/journey/JourneyMilestoneTimeline";
import { LookingAhead } from "@/components/journey/LookingAhead";
import { StageViewShell } from "@/components/layout/StageViewShell";
import { StageStaggerItem } from "@/components/motion/StageTransition";
import { SurfacePanel } from "@/components/ui/SurfacePanel";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardSkeleton, HeroSkeleton } from "@/components/ui/Skeleton";
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
  const { stage, journey } = useJourneyDemo();
  const { t } = useTravellerPreferences();
  const effectiveDisplay = useEffectiveJourneyDisplay();
  const milestones = getJourneyMilestones(stage, effectiveDisplay, t);
  const refinement = getRefinementContent(stage, effectiveDisplay, t);
  const lookingAhead = getLookingAheadEvents(stage, effectiveDisplay, t);
  const routeLabel = `${journey.flight.origin.city} → ${journey.flight.destination.city}`;

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
        <JourneyPageHeader
          routeLabel={routeLabel}
          tripWindow={journey.tripWindowLabel}
        />
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
          <SurfacePanel>
            <SectionHeading>{t("journey.page.sinceLastVisit")}</SectionHeading>
            <p className={cn(typography.bodySm, "mt-2 text-muted")}>
              {t("journey.page.sectionUpdatesHint")}
            </p>
          </SurfacePanel>
          <LookingAhead events={lookingAhead} />
        </aside>
      </StageStaggerItem>
    </StageViewShell>
  );
}
