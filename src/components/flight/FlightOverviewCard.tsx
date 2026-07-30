"use client";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useEffectiveFlight } from "@/hooks/useEffectiveJourneyDisplay";
import { useDisruptionActive } from "@/hooks/useDisruptionActive";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { disruptionEmphasisClass } from "@/lib/disruption-highlight";
import type { MockJourneyFlight } from "@/types/journey";
import { cn } from "@/lib/utils";

type FlightOverviewCardProps = {
  flight: MockJourneyFlight;
};

type DetailItemProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function DetailItem({ label, value, highlight = false }: DetailItemProps) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd
        className={
          highlight
            ? cn("mt-1 text-base", disruptionEmphasisClass)
            : "mt-1 text-base font-medium text-foreground"
        }
      >
        {value}
      </dd>
    </div>
  );
}

export function FlightOverviewCard({ flight }: FlightOverviewCardProps) {
  const { t } = useTravellerPreferences();
  const disruptionActive = useDisruptionActive();
  const effectiveFlight = useEffectiveFlight();
  const route = `${flight.origin.city} → ${flight.destination.city}`;

  return (
    <Card>
      <SectionHeading>{t("flight.summary")}</SectionHeading>

      <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        <DetailItem label={t("flight.flightNumber")} value={flight.number} />
        <DetailItem label={t("flight.route")} value={route} />
        <DetailItem
          label={t("flight.departure")}
          value={effectiveFlight.departureTime}
          highlight={disruptionActive}
        />
        <DetailItem
          label={t("flight.arrival")}
          value={effectiveFlight.arrivalTime}
          highlight={disruptionActive}
        />
        <DetailItem
          label={t("flight.terminal")}
          value={flight.origin.terminal ?? t("flight.notAssigned")}
        />
        <DetailItem
          label={t("common.gate")}
          value={effectiveFlight.gate}
          highlight
        />
        <DetailItem
          label={t("flight.boarding")}
          value={effectiveFlight.boardingTimeFormatted}
          highlight={disruptionActive}
        />
        <DetailItem label={t("common.seat")} value={flight.seat} highlight />
        <DetailItem label={t("flight.boardingGroup")} value={flight.boardingGroup} />
        <DetailItem label={t("flight.aircraft")} value={flight.aircraft} />
        <DetailItem label={t("flight.duration")} value={flight.duration} />
      </dl>

      <div className="mt-6 flex flex-wrap gap-4 border-t border-border/60 pt-5 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <FlightOutlinedIcon sx={{ fontSize: 18 }} aria-hidden="true" />
          {flight.airline}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} aria-hidden="true" />
          {flight.duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <PlaceOutlinedIcon sx={{ fontSize: 18 }} aria-hidden="true" />
          {flight.distance}
        </span>
      </div>
    </Card>
  );
}
