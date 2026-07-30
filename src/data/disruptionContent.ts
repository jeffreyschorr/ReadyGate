import { mockJourney } from "@/data/mockJourney";
import type { TFunction } from "@/i18n/types";
import type { Formatters } from "@/lib/preferences-format";
import type { UpdateItem } from "@/types/journey";
import type { JourneyDisplay } from "@/types/preferences";

export const DISRUPTION_ORIGINAL_GATE = mockJourney.flight.gate;
export const DISRUPTION_NEW_GATE = "18";
export const DISRUPTION_DELAY_MINUTES = 45;

/** Stages from airport arrival onward where a gate change is relevant in the demo. */
export const DISRUPTION_DEMO_STAGE = "AT_AIRPORT" as const;

function addDisruptionDelay(iso: string): string {
  const date = new Date(iso);
  date.setMinutes(date.getMinutes() + DISRUPTION_DELAY_MINUTES);
  return date.toISOString();
}

export function getEffectiveScheduledDeparture(
  iso: string,
  disruptionActive: boolean,
): string {
  return disruptionActive ? addDisruptionDelay(iso) : iso;
}

export function getEffectiveScheduledArrival(
  iso: string,
  disruptionActive: boolean,
): string {
  return disruptionActive ? addDisruptionDelay(iso) : iso;
}

export function getEffectiveBoardingTime(
  iso: string,
  disruptionActive: boolean,
): string {
  return disruptionActive ? addDisruptionDelay(iso) : iso;
}

export function getDisruptionUpdates(
  display: JourneyDisplay,
  t: TFunction,
  formatTime: (iso: string) => string,
): UpdateItem[] {
  const { flight } = mockJourney;
  const delayedDeparture = getEffectiveScheduledDeparture(
    flight.scheduledDeparture,
    true,
  );

  return [
    {
      id: "disruption-gate-change",
      category: "flight",
      importance: "critical",
      icon: "gate",
      title: t("updates.items.disruptionGateChange.title"),
      message: t("updates.items.disruptionGateChange.message", {
        newGate: DISRUPTION_NEW_GATE,
        oldGate: DISRUPTION_ORIGINAL_GATE,
      }),
      relativeTime: t("updates.items.disruptionGateChange.relativeTime"),
    },
    {
      id: "disruption-delay",
      category: "flight",
      importance: "critical",
      icon: "schedule",
      title: t("updates.items.disruptionDelay.title"),
      message: t("updates.items.disruptionDelay.message", {
        flightNumber: flight.number,
        minutes: DISRUPTION_DELAY_MINUTES,
        time: formatTime(delayedDeparture),
      }),
      relativeTime: t("updates.items.disruptionDelay.relativeTime"),
    },
  ];
}

export function getEffectiveGate(disruptionActive: boolean): string {
  return disruptionActive ? DISRUPTION_NEW_GATE : DISRUPTION_ORIGINAL_GATE;
}

export function getEffectiveJourneyDisplay(
  display: JourneyDisplay,
  formatters: Formatters,
  t: TFunction,
  disruptionActive: boolean,
): JourneyDisplay {
  if (!disruptionActive) {
    return display;
  }

  const { flight } = mockJourney;
  const scheduledDeparture = getEffectiveScheduledDeparture(
    flight.scheduledDeparture,
    true,
  );
  const scheduledArrival = getEffectiveScheduledArrival(
    flight.scheduledArrival,
    true,
  );
  const boardingTime = getEffectiveBoardingTime(flight.boardingTime, true);
  const gate = getEffectiveGate(true);

  return {
    ...display,
    departureTime: formatters.formatTime(scheduledDeparture),
    boardingTime: formatters.formatTime(boardingTime),
    arrivalTime: formatters.formatTime(scheduledArrival),
    gateLabel: `${t("common.gate")} ${gate}`,
    gate,
  };
}

export function getDisruptionUnreadCount(
  disruptionActive: boolean,
  disruptionAcknowledged: boolean,
): number {
  if (!disruptionActive || disruptionAcknowledged) {
    return 0;
  }

  return 2;
}
