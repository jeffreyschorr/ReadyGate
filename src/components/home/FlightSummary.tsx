"use client";

import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useEffectiveFlight } from "@/hooks/useEffectiveJourneyDisplay";
import { useDisruptionActive } from "@/hooks/useDisruptionActive";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { disruptionEmphasisClass } from "@/lib/disruption-highlight";
import type { FlightInfoVisibility, MockJourneyFlight } from "@/types/journey";
import { cn } from "@/lib/utils";

type FlightSummaryProps = {
  flight: MockJourneyFlight;
  visibility: FlightInfoVisibility;
  baggageCarousel?: string;
};

const statusVariantMap = {
  "on-time": "success",
  delayed: "warning",
  boarding: "info",
  departed: "neutral",
  landed: "success",
} as const;

export function FlightSummary({
  flight,
  visibility,
  baggageCarousel,
}: FlightSummaryProps) {
  const { t } = useTravellerPreferences();
  const disruptionActive = useDisruptionActive();
  const effectiveFlight = useEffectiveFlight();

  if (!visibility.showSummary && !visibility.showGate) {
    return null;
  }

  const { departureTime, arrivalTime, gate, status, statusLabel } = effectiveFlight;
  const durationLabel = `${departureTime} to ${arrivalTime}`;

  return (
    <Card className={cn(visibility.compact && "shadow-sm")}>
      {visibility.showSummary ? (
        <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted">{flight.airline}</p>
              <h2 className="mt-1 text-lg font-semibold text-heading">
                {flight.number}
              </h2>
            </div>
            <StatusBadge
              label={statusLabel}
              variant={statusVariantMap[status]}
            />
          </div>

          {visibility.showRoute ? (
            <div className="mt-6 flex items-center gap-4">
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {flight.origin.code}
                </p>
                <p className="text-sm text-muted">{flight.origin.city}</p>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    disruptionActive ? disruptionEmphasisClass : "text-foreground",
                  )}
                >
                  {departureTime}
                </p>
              </div>

              <div className="flex flex-1 flex-col items-center gap-1 px-2">
                <div
                  className="h-0.5 w-full rounded-full bg-accent/35"
                  aria-hidden="true"
                />
                <p className="text-xs text-muted">
                  {durationLabel}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-semibold text-foreground">
                  {flight.destination.code}
                </p>
                <p className="text-sm text-muted">{flight.destination.city}</p>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    disruptionActive ? disruptionEmphasisClass : "text-foreground",
                  )}
                >
                  {arrivalTime}
                </p>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      <dl
        className={cn(
          "grid gap-3 text-sm",
          visibility.showSummary && "mt-6 border-t border-border pt-4",
          visibility.compact ? "grid-cols-2" : "sm:grid-cols-3",
        )}
      >
        {visibility.showTerminal ? (
          <div>
            <dt className="text-muted">{t("flight.terminal")}</dt>
            <dd className="mt-1 font-medium text-foreground">
              {flight.origin.terminal ?? t("flight.notAssigned")}
            </dd>
          </div>
        ) : null}
        {visibility.showGate ? (
          <div>
            <dt className="text-muted">{t("common.gate")}</dt>
            <dd
              className={cn(
                "mt-1",
                disruptionActive ? disruptionEmphasisClass : "font-medium text-accent",
              )}
            >
              {gate}
            </dd>
          </div>
        ) : null}
        {visibility.showSeat ? (
          <div>
            <dt className="text-muted">{t("common.seat")}</dt>
            <dd className="mt-1 font-medium text-foreground">{flight.seat}</dd>
          </div>
        ) : null}
        {visibility.showBoardingGroup ? (
          <div>
            <dt className="text-muted">{t("flight.boardingGroup")}</dt>
            <dd className="mt-1 font-medium text-foreground">
              {flight.boardingGroup}
            </dd>
          </div>
        ) : null}
        {visibility.showBaggage && baggageCarousel ? (
          <div>
            <dt className="text-muted">{t("flight.baggageCarousel")}</dt>
            <dd className="mt-1 font-medium text-foreground">
              {baggageCarousel}
            </dd>
          </div>
        ) : null}
      </dl>

      {visibility.showSummary ? (
        <div className="mt-5">
          <Link
            href="/flight"
            className="text-sm font-medium text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("flight.viewDetails")}
          </Link>
        </div>
      ) : null}
    </Card>
  );
}
