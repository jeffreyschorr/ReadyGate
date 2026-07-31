"use client";

import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";

import { Card } from "@/components/ui/Card";
import {
  DISRUPTION_DELAY_MINUTES,
  DISRUPTION_NEW_GATE,
  DISRUPTION_ORIGINAL_GATE,
} from "@/data/disruptionContent";
import { mockJourney } from "@/data/mockJourney";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type FlightDisruptionBannerProps = {
  departureTime: string;
};

export function FlightDisruptionBanner({ departureTime }: FlightDisruptionBannerProps) {
  const { t } = useTravellerPreferences();

  return (
    <Card
      interactive={false}
      className="border-accent/30 bg-accent-subtle/60"
      aria-labelledby="flight-disruption-banner-title"
    >
      <div className="flex gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground"
          aria-hidden="true"
        >
          <BoltOutlinedIcon sx={{ fontSize: 20 }} />
        </span>
        <div className="min-w-0">
          <h2
            id="flight-disruption-banner-title"
            className={cn(typography.cardHeadingSm, "text-heading")}
          >
            {t("flight.disruptionBannerTitle")}
          </h2>
          <p className={cn(typography.bodySm, "mt-1.5 text-foreground")}>
            {t("flight.disruptionBannerMessage", {
              flightNumber: mockJourney.flight.number,
              oldGate: DISRUPTION_ORIGINAL_GATE,
              newGate: DISRUPTION_NEW_GATE,
              minutes: DISRUPTION_DELAY_MINUTES,
              time: departureTime,
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
