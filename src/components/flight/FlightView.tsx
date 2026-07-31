"use client";

import { useEffect } from "react";

import { BoardingPassCard } from "@/components/flight/BoardingPassCard";
import { FlightDetailsCard } from "@/components/flight/FlightDetailsCard";
import { FlightDisruptionBanner } from "@/components/flight/FlightDisruptionBanner";
import { FlightOverviewCard } from "@/components/flight/FlightOverviewCard";
import { FlightPageHeader } from "@/components/flight/FlightPageHeader";
import { NextAction } from "@/components/home/NextAction";
import { CountdownCard } from "@/components/journey/CountdownCard";
import { JourneyHealth } from "@/components/journey/JourneyHealth";
import { StageViewShell } from "@/components/layout/StageViewShell";
import { StageStaggerItem } from "@/components/motion/StageTransition";
import { BulletedTipsCard } from "@/components/ui/BulletedTipsCard";
import { CardSkeleton, HeroSkeleton } from "@/components/ui/Skeleton";
import { getEffectiveGate } from "@/data/disruptionContent";
import {
  getFlightPageContent,
} from "@/data/flightPageContent";
import { getRefinementContent } from "@/data/refinementContent";
import { useEffectiveJourneyDisplay } from "@/hooks/useEffectiveJourneyDisplay";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { pageLayout } from "@/lib/layout";

export function FlightView() {
  const { stage, journey, disruptionActive, acknowledgeFlightDisruption } =
    useJourneyDemo();
  const { t } = useTravellerPreferences();
  const effectiveDisplay = useEffectiveJourneyDisplay();
  const pageContent = getFlightPageContent(stage, effectiveDisplay, t);
  const refinement = getRefinementContent(stage, effectiveDisplay, t);
  const routeLabel = `${journey.flight.origin.city} → ${journey.flight.destination.city}`;
  const gate = getEffectiveGate(disruptionActive);

  useEffect(() => {
    acknowledgeFlightDisruption();
  }, [acknowledgeFlightDisruption]);

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
        <FlightPageHeader
          flightNumber={journey.flight.number}
          routeLabel={routeLabel}
          dateLabel={pageContent.dateLabel}
          displayStatus={pageContent.displayStatus}
        />
      </StageStaggerItem>

      {disruptionActive ? (
        <StageStaggerItem>
          <FlightDisruptionBanner departureTime={effectiveDisplay.departureTime} />
        </StageStaggerItem>
      ) : null}

      {refinement.countdown ? (
        <StageStaggerItem className="space-y-6">
          <CountdownCard countdown={refinement.countdown} />
          {pageContent.showBoardingPass ? (
            <div className="lg:hidden">
              <BoardingPassCard
                journey={journey}
                active
                gate={gate}
              />
            </div>
          ) : null}
        </StageStaggerItem>
      ) : null}

      <StageStaggerItem className="lg:hidden">
        <NextAction message={pageContent.nextActionMessage} urgency={pageContent.urgency} />
      </StageStaggerItem>

      <StageStaggerItem
        className={`grid ${pageLayout.grid} lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start`}
      >
        <div className="space-y-8">
          <FlightOverviewCard flight={journey.flight} />
          <FlightDetailsCard journey={journey} />
          <BulletedTipsCard title={t("flight.helpfulInformation")} items={pageContent.helpfulTips} />
        </div>

        <aside className={`min-w-0 ${pageLayout.asideStack} lg:sticky lg:top-6`}>
          <div className="hidden lg:block">
            <NextAction
              message={pageContent.nextActionMessage}
              urgency={pageContent.urgency}
            />
          </div>
          <div className={pageContent.showBoardingPass ? "hidden lg:block" : undefined}>
            <BoardingPassCard
              journey={journey}
              active={pageContent.showBoardingPass}
              gate={gate}
              note={pageContent.boardingPassNote}
            />
          </div>
          <JourneyHealth items={refinement.health} />
        </aside>
      </StageStaggerItem>
    </StageViewShell>
  );
}
