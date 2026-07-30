"use client";

import { DestinationHeroCard } from "@/components/destination/DestinationHeroCard";
import { DestinationNextSteps } from "@/components/destination/DestinationNextSteps";
import { DestinationPageHeader } from "@/components/destination/DestinationPageHeader";
import { DiscoverSection } from "@/components/destination/DiscoverSection";
import { HotelCard } from "@/components/destination/HotelCard";
import { LocalInformation } from "@/components/destination/LocalInformation";
import { TransportCard } from "@/components/destination/TransportCard";
import { StageViewShell } from "@/components/layout/StageViewShell";
import { StageStaggerItem } from "@/components/motion/StageTransition";
import { BulletedTipsCard } from "@/components/ui/BulletedTipsCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { CardSkeleton, HeroSkeleton } from "@/components/ui/Skeleton";
import {
  getDestinationPageContent,
  getDestinationSteps,
} from "@/data/destinationPageContent";
import { getDiscoverForStage } from "@/data/mockJourney";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { pageLayout } from "@/lib/layout";

export function DestinationView() {
  const { stage, journey } = useJourneyDemo();
  const { display, t } = useTravellerPreferences();
  const pageContent = getDestinationPageContent(stage, display, t);
  const steps = getDestinationSteps(stage, display, t);

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
        <DestinationPageHeader
          city={journey.flight.destination.city}
          tagline={pageContent.headerTagline}
        />
      </StageStaggerItem>

      <StageStaggerItem>
        <DestinationHeroCard
          title={pageContent.heroTitle}
          summary={pageContent.heroSummary}
          journey={journey}
        />
      </StageStaggerItem>

      <StageStaggerItem
        className={`grid ${pageLayout.grid} lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start`}
      >
        <div className="space-y-8">
          <DestinationNextSteps title={pageContent.nextStepsTitle} steps={steps} />

          {pageContent.showTransportProminent ? (
            <TransportCard options={journey.transportModes} prominent />
          ) : null}

          {pageContent.showDiscover ? (
            <DiscoverSection items={getDiscoverForStage(stage)} />
          ) : (
            <EmptyState
              title={t("destination.nearbyTitle")}
              description={t("destination.nearbyDescription")}
            />
          )}
        </div>

        <aside className={`min-w-0 ${pageLayout.asideStack} lg:sticky lg:top-6`}>
          <HotelCard hotel={journey.hotel} prominent={pageContent.showHotelProminent} />

          {!pageContent.showTransportProminent ? (
            <TransportCard options={journey.transportModes} />
          ) : null}

          <LocalInformation weather={journey.weather} localInfo={journey.localInfo} />

          <BulletedTipsCard title={t("destination.reminders")} items={pageContent.reminders} />
        </aside>
      </StageStaggerItem>
    </StageViewShell>
  );
}
