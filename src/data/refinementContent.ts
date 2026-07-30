import { mockJourney } from "@/data/mockJourney";
import type { TFunction } from "@/i18n/types";
import type {
  JourneyHealthItem,
  JourneyStageId,
  RefinementContent,
} from "@/types/journey";
import type { JourneyDisplay } from "@/types/preferences";

const { flight } = mockJourney;

function baseHealth(t: TFunction) {
  return {
    documents: {
      id: "documents",
      label: t("health.labels.documents"),
      status: "ready" as const,
      detail: t("health.baseDetails.photoIdReady"),
    },
    transport: {
      id: "transport",
      label: t("health.labels.transport"),
      status: "pending" as const,
      detail: t("health.baseDetails.planAirportTransport"),
    },
    flight: {
      id: "flight",
      label: t("health.labels.flight"),
      status: "ready" as const,
      detail: t("health.baseDetails.onTime"),
    },
    weather: {
      id: "weather",
      label: t("health.labels.weather"),
      status: "attention" as const,
      detail: t("health.baseDetails.lightRainExpected"),
    },
    accommodation: {
      id: "accommodation",
      label: t("health.labels.accommodation"),
      status: "ready" as const,
      detail: t("health.baseDetails.hotelConfirmed"),
    },
  };
}

function health(...items: JourneyHealthItem[]): JourneyHealthItem[] {
  return items;
}

function buildRefinementContentByStage(
  display: JourneyDisplay,
  t: TFunction,
): Record<JourneyStageId, RefinementContent> {
  const base = baseHealth(t);

  return {
    PLANNING: {
      countdown: null,
      health: health(
        { ...base.documents, status: "ready", detail: t("health.baseDetails.photoIdReady") },
        { ...base.transport, status: "pending", detail: t("health.stages.PLANNING.transport") },
        {
          ...base.flight,
          status: "ready",
          detail: t("health.stages.PLANNING.flight", { flightNumber: flight.number }),
        },
        { ...base.weather, status: "attention", detail: t("health.stages.PLANNING.weather") },
        {
          ...base.accommodation,
          status: "ready",
          detail: t("health.stages.PLANNING.accommodation", { hotelName: display.hotelName }),
        },
      ),
    },
    WEEK_BEFORE: {
      countdown: null,
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "attention", detail: t("health.stages.WEEK_BEFORE.transport") },
        { ...base.flight, status: "ready" },
        {
          ...base.weather,
          status: "ready",
          detail: t("health.stages.WEEK_BEFORE.weather"),
        },
        { ...base.accommodation, status: "ready" },
      ),
    },
    DAY_BEFORE: {
      countdown: null,
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "attention", detail: t("health.stages.DAY_BEFORE.transport") },
        { ...base.flight, status: "ready", detail: t("health.stages.DAY_BEFORE.flight") },
        { ...base.weather, status: "attention" },
        { ...base.accommodation, status: "ready" },
      ),
    },
    CHECK_IN_OPEN: {
      countdown: null,
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "attention", detail: t("health.stages.CHECK_IN_OPEN.transport") },
        { ...base.flight, status: "attention", detail: t("health.stages.CHECK_IN_OPEN.flight") },
        { ...base.weather, status: "attention" },
        { ...base.accommodation, status: "ready" },
      ),
    },
    LEAVING_HOME: {
      countdown: {
        label: t("health.stages.LEAVING_HOME.countdownLabel"),
        display: display.formatDurationMinutes(display.leaveCountdownMinutes),
      },
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "attention", detail: t("health.stages.LEAVING_HOME.transport") },
        { ...base.flight, status: "ready" },
        { ...base.weather, status: "attention" },
        { ...base.accommodation, status: "ready" },
      ),
    },
    AT_AIRPORT: {
      countdown: {
        label: t("health.stages.AT_AIRPORT.countdownLabel"),
        display: t("health.stages.AT_AIRPORT.countdownDisplay"),
      },
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "ready", detail: t("health.stages.AT_AIRPORT.transport") },
        {
          ...base.flight,
          status: "ready",
          detail: t("health.stages.AT_AIRPORT.flight", { gate: display.gateLabel }),
        },
        { ...base.weather, status: "attention" },
        { ...base.accommodation, status: "ready" },
      ),
    },
    AFTER_SECURITY: {
      countdown: {
        label: t("health.stages.AFTER_SECURITY.countdownLabel"),
        display: t("health.stages.AFTER_SECURITY.countdownDisplay"),
      },
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "ready", detail: t("health.stages.AFTER_SECURITY.transport") },
        {
          ...base.flight,
          status: "attention",
          detail: t("health.stages.AFTER_SECURITY.flight", { gate: display.gateLabel }),
        },
        { ...base.weather, status: "attention" },
        { ...base.accommodation, status: "ready" },
      ),
    },
    BOARDING: {
      countdown: {
        label: t("health.stages.BOARDING.countdownLabel"),
        display: t("health.stages.BOARDING.countdownDisplay"),
      },
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "ready", detail: t("health.stages.BOARDING.transport") },
        { ...base.flight, status: "attention", detail: t("health.stages.BOARDING.flight") },
        { ...base.weather, status: "attention" },
        { ...base.accommodation, status: "ready" },
      ),
    },
    IN_FLIGHT: {
      countdown: {
        label: t("health.stages.IN_FLIGHT.countdownLabel"),
        display: t("health.stages.IN_FLIGHT.countdownDisplay"),
      },
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "pending", detail: t("health.stages.IN_FLIGHT.transport") },
        { ...base.flight, status: "ready", detail: t("health.stages.IN_FLIGHT.flight") },
        { ...base.weather, status: "attention", detail: t("health.stages.IN_FLIGHT.weather") },
        { ...base.accommodation, status: "ready", detail: t("health.stages.IN_FLIGHT.accommodation") },
      ),
    },
    ARRIVAL: {
      countdown: null,
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "attention", detail: t("health.stages.ARRIVAL.transport") },
        { ...base.flight, status: "ready", detail: t("health.stages.ARRIVAL.flight") },
        { ...base.weather, status: "attention" },
        { ...base.accommodation, status: "attention", detail: t("health.stages.ARRIVAL.accommodation") },
      ),
    },
    AFTER_ARRIVAL: {
      countdown: null,
      health: health(
        { ...base.documents, status: "ready" },
        { ...base.transport, status: "ready", detail: t("health.stages.AFTER_ARRIVAL.transport") },
        { ...base.flight, status: "ready", detail: t("health.stages.AFTER_ARRIVAL.flight") },
        { ...base.weather, status: "attention" },
        { ...base.accommodation, status: "ready", detail: t("health.stages.AFTER_ARRIVAL.accommodation") },
      ),
    },
  };
}

export function getRefinementContent(
  stage: JourneyStageId,
  display: JourneyDisplay,
  t: TFunction,
): RefinementContent {
  return buildRefinementContentByStage(display, t)[stage];
}
