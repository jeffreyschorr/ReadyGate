"use client";

import { Card } from "@/components/ui/Card";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import type { MockJourney } from "@/types/journey";

type DestinationHeroCardProps = {
  title: string;
  summary: string;
  journey: MockJourney;
};

export function DestinationHeroCard({
  title,
  summary,
  journey,
}: DestinationHeroCardProps) {
  const { weather } = journey;
  const { display, t } = useTravellerPreferences();

  return (
    <Card className="border-border/60 bg-accent-subtle/30">
      <h2 className="text-xl font-semibold text-heading md:text-2xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted">{summary}</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-muted">{t("destination.weather")}</dt>
          <dd className="mt-1 text-base font-medium text-foreground">
            {display.destinationTemp}
          </dd>
          <dd className="text-sm text-muted">{weather.destinationCondition}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">{t("destination.localTime")}</dt>
          <dd className="mt-1 text-base font-medium text-foreground">
            {display.destinationLocalTime}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-muted">{t("destination.expectedArrival")}</dt>
          <dd className="mt-1 text-base font-medium text-foreground">
            {display.arrivalTime}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
