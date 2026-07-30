"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslation } from "@/i18n/useTranslation";
import type { MockJourney } from "@/types/journey";

type FlightDetailsCardProps = {
  journey: MockJourney;
};

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/40 py-3 last:border-b-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function FlightDetailsCard({ journey }: FlightDetailsCardProps) {
  const { t } = useTranslation();
  const { flight, travel, flightAmenities } = journey;

  return (
    <Card>
      <SectionHeading>{t("flight.flightDetails")}</SectionHeading>
      <dl className="mt-4">
        <DetailRow label={t("flight.aircraft")} value={flight.aircraft} />
        <DetailRow label={t("flight.airline")} value={flight.airline} />
        <DetailRow label={t("flight.distance")} value={flight.distance} />
        <DetailRow label={t("flight.flightTime")} value={flight.duration} />
        <DetailRow label={t("flight.baggageAllowance")} value={travel.baggageAllowance} />
        <DetailRow label={t("flight.cabin")} value={flightAmenities.cabin} />
        <DetailRow label={t("flight.meal")} value={flightAmenities.meal} />
        <DetailRow label={t("flight.wifi")} value={flightAmenities.wifi} />
        <DetailRow label={t("flight.powerOutlets")} value={flightAmenities.power} />
        <DetailRow label={t("flight.entertainment")} value={flightAmenities.entertainment} />
      </dl>
    </Card>
  );
}
