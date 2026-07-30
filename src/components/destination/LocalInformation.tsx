"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import type { MockJourneyLocalInfo, MockJourneyWeather } from "@/types/journey";

type LocalInformationProps = {
  weather: MockJourneyWeather;
  localInfo: MockJourneyLocalInfo;
};

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/40 py-3 last:border-b-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function LocalInformation({
  weather,
  localInfo,
}: LocalInformationProps) {
  const { display, t } = useTravellerPreferences();

  return (
    <Card>
      <SectionHeading>{t("destination.localInformation")}</SectionHeading>
      <dl className="mt-4">
        <InfoRow
          label={t("destination.weather")}
          value={`${display.destinationTemp}, ${weather.destinationCondition}`}
        />
        <InfoRow label={t("destination.localInfo.sunset")} value={localInfo.sunset} />
        <InfoRow label={t("destination.localInfo.currency")} value={localInfo.currency} />
        <InfoRow label={t("destination.localInfo.emergency")} value={localInfo.emergency} />
        <InfoRow label={t("destination.localInfo.powerPlug")} value={localInfo.powerPlug} />
        <InfoRow label={t("destination.localInfo.timezone")} value={localInfo.timezone} />
      </dl>
    </Card>
  );
}
