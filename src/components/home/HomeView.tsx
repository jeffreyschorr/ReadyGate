"use client";

import { FlightSummary } from "@/components/home/FlightSummary";
import { NextAction } from "@/components/home/NextAction";
import { FlightTimelineStrip } from "@/components/flight/FlightTimelineStrip";
import { BoardingPassCard } from "@/components/flight/BoardingPassCard";
import { ContextCardGrid } from "@/components/journey/ContextCard";
import { CountdownCard } from "@/components/journey/CountdownCard";
import { JourneyHealth } from "@/components/journey/JourneyHealth";
import { JourneyProgress } from "@/components/journey/JourneyProgress";
import { JourneyPulse } from "@/components/journey/JourneyPulse";
import { ReassuranceMessage } from "@/components/journey/ReassuranceMessage";
import { WhatChanged } from "@/components/journey/WhatChanged";
import { StageViewShell } from "@/components/layout/StageViewShell";
import { StageStaggerItem } from "@/components/motion/StageTransition";
import { Card } from "@/components/ui/Card";
import { SubsectionHeading } from "@/components/ui/SectionHeading";
import { CardSkeleton, HeroSkeleton } from "@/components/ui/Skeleton";
import {
  getJourneyProgressSteps,
} from "@/data/stageContent";
import { getEffectiveGate } from "@/data/disruptionContent";
import { isBoardingPassVisibleStage } from "@/data/boardingPass";
import { getFlightTimelineSteps } from "@/data/flightPageContent";
import { getRefinementContent } from "@/data/refinementContent";
import { useEffectiveJourneyDisplay } from "@/hooks/useEffectiveJourneyDisplay";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { pageLayout } from "@/lib/layout";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function HomeView() {
  const { stage, journey, content, disruptionActive } = useJourneyDemo();
  const { t } = useTravellerPreferences();
  const effectiveDisplay = useEffectiveJourneyDisplay();
  const progressSteps = getJourneyProgressSteps(stage, t);
  const timelineSteps = getFlightTimelineSteps(stage, effectiveDisplay, t);
  const refinement = getRefinementContent(stage, effectiveDisplay, t);
  const showFlight =
    content.flightVisibility.showSummary || content.flightVisibility.showGate;
  const showBoardingPass = isBoardingPassVisibleStage(stage);
  const boardingPassProps = {
    journey,
    active: true as const,
    gate: getEffectiveGate(disruptionActive),
  };
  const mobileBoardingPass = showBoardingPass ? (
    <div className="lg:hidden">
      <BoardingPassCard {...boardingPassProps} />
    </div>
  ) : null;
  const desktopBoardingPass = showBoardingPass ? (
    <div className="hidden lg:block">
      <BoardingPassCard {...boardingPassProps} />
    </div>
  ) : null;

  return (
    <StageViewShell
      stage={stage}
      loadingFallback={
        <>
          <HeroSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      }
    >
      <StageStaggerItem>
        <header className="max-w-2xl space-y-4" data-tour="today-header">
          <p className={cn(typography.label, "text-accent")}>{content.eyebrow}</p>
          <h1
            className={cn(typography.pageTitle, "text-page-title")}
          >
            {content.heading}
          </h1>
          <JourneyPulse state={content.pulse} statusLabel={content.journeyStatus} />
          <ReassuranceMessage message={content.reassurance} />
        </header>
      </StageStaggerItem>

      <StageStaggerItem>
        <FlightTimelineStrip steps={timelineSteps} prominent />
      </StageStaggerItem>

      {refinement.countdown && content.layout !== "focused" ? (
        <StageStaggerItem className="space-y-6">
          <CountdownCard countdown={refinement.countdown} />
          {mobileBoardingPass}
        </StageStaggerItem>
      ) : null}

      {content.layout === "focused" ? (
        <StageStaggerItem
          className={cn(
            "grid gap-6",
            pageLayout.grid,
            "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
          )}
        >
          <div className="space-y-6">
            {refinement.countdown ? (
              <>
                <CountdownCard countdown={refinement.countdown} />
                {mobileBoardingPass}
              </>
            ) : null}
            <NextAction action={content.nextAction} urgency={content.urgency} compact tourId="next-action" />
            <ContextCardGrid cards={content.contextCards} columns={1} />
          </div>

          <div className={pageLayout.asideStack}>
            {desktopBoardingPass}
            {showFlight ? (
              <FlightSummary
                flight={journey.flight}
                visibility={content.flightVisibility}
                baggageCarousel={journey.travel.baggageCarousel}
              />
            ) : null}
            <JourneyHealth items={refinement.health} />
            {content.notificationSummary ? (
              <Card>
                <SubsectionHeading>{t("navigation.updates")}</SubsectionHeading>
                <p className={cn(typography.bodySm, "mt-2 text-foreground")}>
                  {content.notificationSummary}
                </p>
              </Card>
            ) : null}
            {content.showWhatChanged ? (
              <WhatChanged message={content.whatChanged} />
            ) : null}
          </div>
        </StageStaggerItem>
      ) : null}

      {content.layout === "minimal" ? (
        <StageStaggerItem
          className={cn(
            "grid gap-6",
            pageLayout.grid,
            "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
          )}
        >
          <div className="space-y-6">
            <NextAction action={content.nextAction} urgency={content.urgency} tourId="next-action" />
            <ContextCardGrid cards={content.contextCards} />
          </div>
          <div className={pageLayout.asideStack}>
            <JourneyHealth items={refinement.health} />
            {showFlight ? (
              <FlightSummary
                flight={journey.flight}
                visibility={content.flightVisibility}
                baggageCarousel={journey.travel.baggageCarousel}
              />
            ) : null}
            {content.showWhatChanged ? (
              <WhatChanged message={content.whatChanged} />
            ) : null}
          </div>
        </StageStaggerItem>
      ) : null}

      {content.layout === "default" ? (
        <StageStaggerItem
          className={cn(
            "grid gap-6",
            content.showProgress
              ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
              : undefined,
          )}
        >
          <div className="space-y-6">
            <NextAction action={content.nextAction} urgency={content.urgency} tourId="next-action" />
            <ContextCardGrid cards={content.contextCards} />
            <JourneyHealth items={refinement.health} />
            {content.notificationSummary ? (
              <Card>
                <SubsectionHeading>{t("navigation.updates")}</SubsectionHeading>
                <p className={cn(typography.bodySm, "mt-2 text-foreground")}>
                  {content.notificationSummary}
                </p>
              </Card>
            ) : null}
          </div>

          <div className="space-y-6">
            {desktopBoardingPass}
            {showFlight ? (
              <FlightSummary
                flight={journey.flight}
                visibility={content.flightVisibility}
                baggageCarousel={journey.travel.baggageCarousel}
              />
            ) : null}
            {content.showProgress ? (
              <div className="hidden lg:block">
                <JourneyProgress steps={progressSteps} />
              </div>
            ) : null}
            {content.showWhatChanged ? (
              <WhatChanged message={content.whatChanged} />
            ) : null}
          </div>
        </StageStaggerItem>
      ) : null}
    </StageViewShell>
  );
}
