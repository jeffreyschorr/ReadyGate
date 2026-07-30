import { getDisruptionUpdates } from "@/data/disruptionContent";
import { mockJourney } from "@/data/mockJourney";
import type { TFunction } from "@/i18n/types";
import type { JourneyStageId, UpdateFilterId, UpdateItem, UpdatesPageContent } from "@/types/journey";
import type { JourneyDisplay } from "@/types/preferences";

const { flight, travel } = mockJourney;

function buildUpdatesPageContentByStage(
  display: JourneyDisplay,
  t: TFunction,
): Record<JourneyStageId, UpdatesPageContent> {
  const gateUpdate: UpdateItem = {
    id: "gate-assigned",
    category: "flight",
    importance: "important",
    icon: "gate",
    title: t("updates.items.gateAssigned.title"),
    message: t("updates.items.gateAssigned.message", { gate: display.gateLabel }),
    relativeTime: t("updates.items.gateAssigned.relativeTime"),
  };

  const checkInOpen: UpdateItem = {
    id: "check-in-open",
    category: "flight",
    importance: "important",
    icon: "check-in",
    title: t("updates.items.checkInOpen.title"),
    message: t("updates.items.checkInOpen.message"),
    relativeTime: t("updates.items.checkInOpen.relativeTime"),
  };

  const weatherUpdate: UpdateItem = {
    id: "weather-update",
    category: "destination",
    importance: "normal",
    icon: "weather",
    title: t("updates.items.weatherUpdated.title"),
    message: t("updates.items.weatherUpdated.message"),
    relativeTime: t("updates.items.weatherUpdated.relativeTime"),
  };

  const boardingSoon: UpdateItem = {
    id: "boarding-soon",
    category: "flight",
    importance: "important",
    icon: "boarding",
    title: t("updates.items.boardingSoon.title"),
    message: t("updates.items.boardingSoon.message", { gate: display.gateLabel }),
    relativeTime: t("updates.items.boardingSoon.relativeTime"),
  };

  const seatReminder: UpdateItem = {
    id: "seat-reminder",
    category: "journey",
    importance: "normal",
    icon: "reminder",
    title: t("updates.items.seatConfirmed.title"),
    message: t("updates.items.seatConfirmed.message", { seat: flight.seat }),
    relativeTime: t("updates.items.seatConfirmed.relativeTime"),
  };

  const packingReminder: UpdateItem = {
    id: "packing-reminder",
    category: "journey",
    importance: "normal",
    icon: "reminder",
    title: t("updates.items.packJacket.title"),
    message: t("updates.items.packJacket.message"),
    relativeTime: t("updates.items.packJacket.relativeTime"),
  };

  const airportArrival: UpdateItem = {
    id: "airport-arrival",
    category: "journey",
    importance: "normal",
    icon: "schedule",
    title: t("updates.items.suggestedArrival.title"),
    message: t("updates.items.suggestedArrival.message", {
      time: display.suggestedAirportArrival,
    }),
    relativeTime: t("updates.items.suggestedArrival.relativeTime"),
  };

  const securityUpdate: UpdateItem = {
    id: "security-estimate",
    category: "journey",
    importance: "normal",
    icon: "schedule",
    title: t("updates.items.securityWait.title"),
    message: t("updates.items.securityWait.message", {
      minutes: travel.securityEstimateMinutes,
    }),
    relativeTime: t("updates.items.securityWait.relativeTime"),
  };

  const boardingStarted: UpdateItem = {
    id: "boarding-started",
    category: "flight",
    importance: "important",
    icon: "boarding",
    title: t("updates.items.boardingStarted.title"),
    message: t("updates.items.boardingStarted.message", {
      group: flight.boardingGroup,
      gate: display.gateLabel,
    }),
    relativeTime: t("updates.items.boardingStarted.relativeTime"),
  };

  const flightOnTime: UpdateItem = {
    id: "flight-on-time",
    category: "flight",
    importance: "normal",
    icon: "schedule",
    title: t("updates.items.stillOnTime.title"),
    message: t("updates.items.stillOnTime.message", {
      flightNumber: flight.number,
      time: display.departureTime,
    }),
    relativeTime: t("updates.items.stillOnTime.relativeTime"),
  };

  const landedUpdate: UpdateItem = {
    id: "landed",
    category: "flight",
    importance: "important",
    icon: "schedule",
    title: t("updates.items.landed.title"),
    message: t("updates.items.landed.message", { flightNumber: flight.number }),
    relativeTime: t("updates.items.landed.relativeTime"),
  };

  const baggageUpdate: UpdateItem = {
    id: "baggage-carousel",
    category: "destination",
    importance: "important",
    icon: "baggage",
    title: t("updates.items.baggageCarousel.title"),
    message: t("updates.items.baggageCarousel.message", {
      carousel: travel.baggageCarousel,
    }),
    relativeTime: t("updates.items.baggageCarousel.relativeTime"),
  };

  const transportUpdate: UpdateItem = {
    id: "transport-options",
    category: "destination",
    importance: "normal",
    icon: "transport",
    title: t("updates.items.skybusRunning.title"),
    message: t("updates.items.skybusRunning.message"),
    relativeTime: t("updates.items.skybusRunning.relativeTime"),
  };

  const hotelReminder: UpdateItem = {
    id: "hotel-checkin",
    category: "destination",
    importance: "normal",
    icon: "reminder",
    title: t("updates.items.hotelCheckIn.title"),
    message: t("updates.items.hotelCheckIn.message", { time: display.hotelCheckIn }),
    relativeTime: t("updates.items.hotelCheckIn.relativeTime"),
  };

  return {
    PLANNING: {
      showEmptyState: false,
      updates: [seatReminder],
    },

    WEEK_BEFORE: {
      showEmptyState: false,
      updates: [seatReminder],
    },

    DAY_BEFORE: {
      showEmptyState: false,
      updates: [packingReminder, checkInOpen, weatherUpdate],
    },

    CHECK_IN_OPEN: {
      showEmptyState: false,
      updates: [checkInOpen, weatherUpdate, seatReminder],
    },

    LEAVING_HOME: {
      showEmptyState: false,
      updates: [gateUpdate, checkInOpen, airportArrival],
    },

    AT_AIRPORT: {
      showEmptyState: false,
      updates: [gateUpdate, securityUpdate, airportArrival],
    },

    AFTER_SECURITY: {
      showEmptyState: false,
      updates: [gateUpdate, boardingSoon, securityUpdate],
    },

    BOARDING: {
      showEmptyState: false,
      updates: [boardingStarted, boardingSoon, gateUpdate],
    },

    IN_FLIGHT: {
      showEmptyState: false,
      updates: [flightOnTime, weatherUpdate, hotelReminder],
    },

    ARRIVAL: {
      showEmptyState: false,
      updates: [landedUpdate, baggageUpdate, transportUpdate],
    },

    AFTER_ARRIVAL: {
      showEmptyState: false,
      updates: [hotelReminder, transportUpdate],
    },
  };
}

export function getUpdatesPageContent(
  stage: JourneyStageId,
  display: JourneyDisplay,
  t: TFunction,
  options?: {
    disruptionActive?: boolean;
    formatTime?: (iso: string) => string;
  },
): UpdatesPageContent {
  const base = buildUpdatesPageContentByStage(display, t)[stage];

  if (!options?.disruptionActive || !options.formatTime) {
    return base;
  }

  return {
    showEmptyState: false,
    updates: [
      ...getDisruptionUpdates(display, t, options.formatTime),
      ...base.updates,
    ],
  };
}

export function filterUpdates(
  updates: UpdateItem[],
  filter: UpdateFilterId,
): UpdateItem[] {
  if (filter === "all") {
    return updates;
  }

  if (filter === "important") {
    return updates.filter(
      (update) =>
        update.importance === "important" || update.importance === "critical",
    );
  }

  return updates.filter((update) => update.category === filter);
}
