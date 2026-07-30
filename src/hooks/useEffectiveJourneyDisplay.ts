"use client";

import { useMemo } from "react";

import {
  getEffectiveBoardingTime,
  getEffectiveGate,
  getEffectiveJourneyDisplay,
  getEffectiveScheduledArrival,
  getEffectiveScheduledDeparture,
} from "@/data/disruptionContent";
import { mockJourney } from "@/data/mockJourney";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import type { JourneyDisplay } from "@/types/preferences";

export function useEffectiveJourneyDisplay(): JourneyDisplay {
  const { display, formatters, t } = useTravellerPreferences();
  const { disruptionActive } = useJourneyDemo();

  return useMemo(
    () => getEffectiveJourneyDisplay(display, formatters, t, disruptionActive),
    [display, formatters, t, disruptionActive],
  );
}

export function useEffectiveFlight() {
  const { disruptionActive } = useJourneyDemo();
  const { formatters, t } = useTravellerPreferences();
  const { flight } = mockJourney;

  return useMemo(() => {
    const scheduledDeparture = getEffectiveScheduledDeparture(
      flight.scheduledDeparture,
      disruptionActive,
    );
    const scheduledArrival = getEffectiveScheduledArrival(
      flight.scheduledArrival,
      disruptionActive,
    );
    const boardingTime = getEffectiveBoardingTime(flight.boardingTime, disruptionActive);
    const gate = getEffectiveGate(disruptionActive);

    return {
      gate,
      scheduledDeparture,
      scheduledArrival,
      boardingTime,
      departureTime: formatters.formatTime(scheduledDeparture),
      arrivalTime: formatters.formatTime(scheduledArrival),
      boardingTimeFormatted: formatters.formatTime(boardingTime),
      status: disruptionActive ? ("delayed" as const) : flight.status,
      statusLabel: disruptionActive ? t("status.flight.delayed") : flight.statusLabel,
    };
  }, [disruptionActive, flight, formatters, t]);
}
