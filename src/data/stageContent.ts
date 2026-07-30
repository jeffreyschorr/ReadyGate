import { mockJourney } from "@/data/mockJourney";
import type { TFunction, TranslationKey } from "@/i18n/types";
import type { JourneyDisplay } from "@/types/preferences";
import {
  JOURNEY_STAGE_IDS,
  type JourneyStageId,
  type StageContent,
} from "@/types/journey";

const { flight, travel, weather, documents, preparationTasks, nearbyOptions, transportOptions } =
  mockJourney;

const DOCUMENT_LABEL_KEYS: Record<string, TranslationKey> = {
  id: "journey.documents.photoId",
  "boarding-pass": "journey.documents.boardingPass",
  booking: "journey.documents.bookingReference",
};

const DOCUMENT_STATUS_KEYS: Partial<Record<string, TranslationKey>> = {
  id: "journey.documents.photoIdStatus",
  "boarding-pass": "journey.documents.boardingPassStatus",
};

const PREPARATION_TASK_KEYS: TranslationKey[] = [
  "journey.preparationTasks.parking",
  "journey.preparationTasks.liquids",
];

function baseFlightVisibility(
  overrides: Partial<StageContent["flightVisibility"]>,
): StageContent["flightVisibility"] {
  return {
    showSummary: true,
    showGate: true,
    showSeat: true,
    showBoardingGroup: true,
    showTerminal: true,
    showBaggage: false,
    showRoute: true,
    compact: false,
    ...overrides,
  };
}

function buildStageContentConfig(
  display: JourneyDisplay,
  t: TFunction,
): Record<JourneyStageId, StageContent> {
  return {
    PLANNING: {
      eyebrow: t("format.daysUntilDeparture", { days: travel.daysUntilDeparture }),
      heading: t("stages.PLANNING.heading"),
      reassurance: t("stages.PLANNING.reassurance"),
      journeyStatus: t("stages.PLANNING.journeyStatus"),
      pulse: "relaxed",
      urgency: "low",
      nextAction: {
        title: t("stages.PLANNING.nextActionTitle"),
        timing: t("stages.PLANNING.nextActionTiming"),
        explanation: t("stages.PLANNING.nextActionExplanation"),
      },
      whatChanged: t("stages.PLANNING.whatChanged"),
      contextCards: [
        {
          id: "days",
          title: t("journey.cardTitles.daysUntilDeparture"),
          value: `${travel.daysUntilDeparture}`,
          detail: t("stages.PLANNING.cardDaysDetail", {
            travelDate: display.travelDateLabel,
          }),
        },
        {
          id: "seat",
          title: t("journey.cardTitles.seat"),
          value: flight.seat,
          detail: t("stages.PLANNING.cardSeatDetail", {
            boardingGroup: flight.boardingGroup,
          }),
        },
        {
          id: "baggage",
          title: t("journey.cardTitles.baggageAllowance"),
          value: t("stages.PLANNING.cardBaggageValue"),
          detail: travel.baggageAllowance,
        },
      ],
      flightVisibility: baseFlightVisibility({
        showGate: false,
        showBoardingGroup: false,
        compact: true,
      }),
      progressIndex: 0,
      layout: "default",
      showProgress: true,
      showWhatChanged: true,
    },

    WEEK_BEFORE: {
      eyebrow: t("stages.WEEK_BEFORE.eyebrow"),
      heading: t("stages.WEEK_BEFORE.heading"),
      reassurance: t("stages.WEEK_BEFORE.reassurance"),
      journeyStatus: t("stages.WEEK_BEFORE.journeyStatus"),
      pulse: "relaxed",
      urgency: "low",
      nextAction: {
        title: t("stages.WEEK_BEFORE.nextActionTitle"),
        timing: t("stages.WEEK_BEFORE.nextActionTiming"),
        explanation: t("stages.WEEK_BEFORE.nextActionExplanation"),
      },
      whatChanged: t("stages.WEEK_BEFORE.whatChanged"),
      contextCards: [
        {
          id: "weather",
          title: t("journey.cardTitles.melbourneWeather"),
          value: display.destinationTemp,
          detail: t("stages.WEEK_BEFORE.cardWeatherDetail"),
        },
        {
          id: "transport",
          title: t("journey.cardTitles.gettingThere"),
          value: t("stages.WEEK_BEFORE.cardTransportValue", {
            drive: display.formatDriveMinutes(display.driveMinutes),
          }),
          detail: t("stages.WEEK_BEFORE.cardTransportDetail", {
            time: display.suggestedAirportArrival,
          }),
        },
        {
          id: "baggage",
          title: t("journey.cardTitles.baggage"),
          value: t("stages.WEEK_BEFORE.cardBaggageValue"),
          detail: travel.baggageAllowance,
        },
        ...preparationTasks.map((_, index) => ({
          id: `prep-${index}`,
          title: t("journey.cardTitles.toDo"),
          value: t(PREPARATION_TASK_KEYS[index] ?? "journey.preparationTasks.parking"),
        })),
      ],
      flightVisibility: baseFlightVisibility({
        showGate: false,
        compact: true,
      }),
      progressIndex: 1,
      layout: "default",
      showProgress: true,
      showWhatChanged: true,
    },

    DAY_BEFORE: {
      eyebrow: t("stages.DAY_BEFORE.eyebrow"),
      heading: t("stages.DAY_BEFORE.heading"),
      reassurance: t("stages.DAY_BEFORE.reassurance"),
      journeyStatus: t("stages.DAY_BEFORE.journeyStatus"),
      pulse: "attentive",
      urgency: "medium",
      nextAction: {
        title: t("stages.DAY_BEFORE.nextActionTitle"),
        timing: t("stages.DAY_BEFORE.nextActionTiming"),
        explanation: t("stages.DAY_BEFORE.nextActionExplanation"),
      },
      whatChanged: t("stages.DAY_BEFORE.whatChanged", {
        time: display.departureTime,
      }),
      contextCards: [
        {
          id: "packing",
          title: t("journey.cardTitles.packing"),
          value: t("stages.DAY_BEFORE.cardPackingValue"),
          detail: weather.destinationOutlook,
        },
        {
          id: "weather",
          title: t("journey.cardTitles.melbourne"),
          value: display.destinationTemp,
          detail: weather.destinationCondition,
          weatherIcon: weather.conditionKind,
        },
        {
          id: "airport-plan",
          title: t("journey.cardTitles.leaveHome"),
          value: display.recommendedLeaveTime,
          detail: t("stages.DAY_BEFORE.cardLeaveHomeDetail", {
            drive: display.formatDriveMinutes(display.driveMinutes),
            time: display.suggestedAirportArrival,
          }),
        },
        {
          id: "check-in",
          title: t("journey.cardTitles.checkIn"),
          value: t("stages.DAY_BEFORE.cardCheckInValue"),
          detail: travel.checkInOpens,
        },
        ...documents.map((doc) => ({
          id: doc.id,
          title: t("journey.cardTitles.documents"),
          value: t(DOCUMENT_LABEL_KEYS[doc.id] ?? "journey.documents.photoId"),
          detail:
            DOCUMENT_STATUS_KEYS[doc.id] !== undefined
              ? t(DOCUMENT_STATUS_KEYS[doc.id]!)
              : doc.status,
        })),
      ],
      flightVisibility: baseFlightVisibility({
        showGate: false,
        compact: true,
      }),
      progressIndex: 2,
      notificationSummary: t("stages.DAY_BEFORE.notificationSummary"),
      layout: "default",
      showProgress: true,
      showWhatChanged: true,
    },

    CHECK_IN_OPEN: {
      eyebrow: t("stages.CHECK_IN_OPEN.eyebrow"),
      heading: t("stages.CHECK_IN_OPEN.heading"),
      reassurance: t("stages.CHECK_IN_OPEN.reassurance"),
      journeyStatus: t("stages.CHECK_IN_OPEN.journeyStatus"),
      pulse: "action-required",
      urgency: "high",
      nextAction: {
        title: t("stages.CHECK_IN_OPEN.nextActionTitle"),
        timing: t("stages.CHECK_IN_OPEN.nextActionTiming"),
        explanation: t("format.seatDetail", { seat: flight.seat }),
        actionLabel: t("stages.CHECK_IN_OPEN.nextActionLabel"),
        href: "/flight",
      },
      whatChanged: t("format.flightOpenCheckIn", { flightNumber: flight.number }),
      contextCards: [
        {
          id: "seat",
          title: t("journey.cardTitles.seat"),
          value: flight.seat,
          detail: flight.boardingGroup,
        },
        {
          id: "baggage",
          title: t("journey.cardTitles.baggage"),
          value: t("stages.CHECK_IN_OPEN.cardBaggageValue"),
          detail: travel.baggageAllowance,
        },
        {
          id: "departure",
          title: t("journey.cardTitles.departure"),
          value: display.departureTime,
          detail: t("stages.CHECK_IN_OPEN.cardDepartureDetail", {
            origin: flight.origin.city,
            destination: flight.destination.city,
          }),
          disruptionEmphasis: "value",
        },
      ],
      flightVisibility: baseFlightVisibility({
        showGate: false,
        compact: true,
      }),
      progressIndex: 3,
      notificationSummary: t("stages.CHECK_IN_OPEN.notificationSummary"),
      layout: "default",
      showProgress: true,
      showWhatChanged: true,
    },

    LEAVING_HOME: {
      eyebrow: t("stages.LEAVING_HOME.eyebrow"),
      heading: t("stages.LEAVING_HOME.heading"),
      reassurance: t("stages.LEAVING_HOME.reassurance"),
      journeyStatus: t("stages.LEAVING_HOME.journeyStatus"),
      pulse: "action-required",
      urgency: "high",
      nextAction: {
        title: t("stages.LEAVING_HOME.nextActionTitle", {
          time: display.recommendedLeaveTime,
        }),
        timing: display.recommendedLeaveTime,
        explanation: t("stages.LEAVING_HOME.nextActionExplanation"),
      },
      whatChanged: t("stages.LEAVING_HOME.whatChanged"),
      contextCards: [
        {
          id: "drive",
          title: t("journey.cardTitles.drive"),
          value: display.formatDriveMinutes(display.driveMinutes),
          detail: travel.trafficStatus,
        },
        {
          id: "arrival",
          title: t("journey.cardTitles.arriveAtAirport"),
          value: display.suggestedAirportArrival,
          detail: t("stages.LEAVING_HOME.cardArrivalDetail"),
        },
        {
          id: "boarding",
          title: t("journey.cardTitles.boarding"),
          value: display.boardingTime,
          detail: t("stages.LEAVING_HOME.cardBoardingDetail", {
            gate: display.gateLabel,
            group: flight.boardingGroup,
          }),
          disruptionEmphasis: "both",
        },
      ],
      flightVisibility: baseFlightVisibility({ showBoardingGroup: false }),
      progressIndex: 4,
      layout: "default",
      showProgress: true,
      showWhatChanged: true,
    },

    AT_AIRPORT: {
      eyebrow: t("stages.AT_AIRPORT.eyebrow"),
      heading: t("stages.AT_AIRPORT.heading"),
      reassurance: t("stages.AT_AIRPORT.reassurance"),
      journeyStatus: t("stages.AT_AIRPORT.journeyStatus", {
        gate: display.gateLabel,
      }),
      pulse: "attentive",
      urgency: "medium",
      nextAction: {
        title: t("stages.AT_AIRPORT.nextActionTitle"),
        timing: t("stages.AT_AIRPORT.nextActionTiming"),
        explanation: t("stages.AT_AIRPORT.nextActionExplanation", {
          minutes: travel.securityEstimateMinutes,
          gate: display.gateLabel,
        }),
      },
      whatChanged: t("format.gateAssigned", { gate: display.gateLabel }),
      contextCards: [
        {
          id: "terminal",
          title: t("journey.cardTitles.terminal"),
          value: flight.origin.terminal ?? t("common.domesticTerminal"),
          detail: flight.origin.airport,
        },
        {
          id: "security",
          title: t("journey.cardTitles.security"),
          value: t("format.aboutMinutes", { minutes: travel.securityEstimateMinutes }),
          detail: t("common.normalQueue"),
        },
        {
          id: "boarding-time",
          title: t("journey.cardTitles.untilBoarding"),
          value: t("stages.AT_AIRPORT.cardUntilBoardingValue"),
          detail: t("stages.AT_AIRPORT.cardUntilBoardingDetail", {
            time: display.boardingTime,
          }),
          disruptionEmphasis: "detail",
        },
        {
          id: "next-location",
          title: t("journey.cardTitles.next"),
          value: t("stages.AT_AIRPORT.cardNextValue"),
          detail: travel.baggageDropStatus,
        },
      ],
      flightVisibility: baseFlightVisibility({ showSeat: false }),
      progressIndex: 5,
      notificationSummary: t("stages.AT_AIRPORT.notificationSummary", {
        gate: display.gateLabel,
      }),
      layout: "default",
      showProgress: true,
      showWhatChanged: true,
    },

    AFTER_SECURITY: {
      eyebrow: t("stages.AFTER_SECURITY.eyebrow"),
      heading: t("stages.AFTER_SECURITY.heading"),
      reassurance: t("format.gateWalkAway", {
        gate: display.gateLabel,
        walk: display.formatWalkMinutes(travel.walkToGateMinutes),
        time: display.boardingTime,
      }),
      journeyStatus: t("stages.AFTER_SECURITY.journeyStatus"),
      pulse: "relaxed",
      urgency: "low",
      nextAction: {
        title: t("format.walkToGate", { gate: display.gateLabel }),
        timing: display.formatWalkMinutes(travel.walkToGateMinutes),
        explanation: t("stages.AFTER_SECURITY.nextActionExplanation"),
      },
      whatChanged: t("stages.AFTER_SECURITY.whatChanged"),
      contextCards: [
        {
          id: "gate",
          title: t("journey.cardTitles.gate"),
          value: display.gate,
          detail: display.formatWalkMinutes(travel.walkToGateMinutes),
          disruptionEmphasis: "value",
        },
        {
          id: "time",
          title: t("journey.cardTitles.untilBoarding"),
          value: t("stages.AFTER_SECURITY.cardUntilBoardingValue"),
          detail: t("stages.AFTER_SECURITY.cardUntilBoardingDetail", {
            time: display.boardingTime,
          }),
          disruptionEmphasis: "detail",
        },
        ...nearbyOptions.slice(0, 2).map((option, index) => ({
          id: `nearby-${index}`,
          title: t("journey.cardTitles.nearby"),
          value: option.split(" · ")[0],
          detail: option.split(" · ")[1],
        })),
      ],
      flightVisibility: baseFlightVisibility({ compact: true }),
      progressIndex: 6,
      layout: "default",
      showProgress: true,
      showWhatChanged: true,
    },

    BOARDING: {
      eyebrow: t("stages.BOARDING.eyebrow"),
      heading: t("stages.BOARDING.heading"),
      reassurance: t("stages.BOARDING.reassurance"),
      journeyStatus: t("stages.BOARDING.journeyStatus"),
      pulse: "action-required",
      urgency: "high",
      nextAction: {
        title: t("format.boardingGroupGate", {
          group: flight.boardingGroup,
          gate: display.gateLabel,
        }),
        timing: t("stages.BOARDING.nextActionTiming"),
        explanation: t("format.seatLeftSide", { seat: flight.seat }),
      },
      whatChanged: t("format.flightBoarding", { flightNumber: flight.number }),
      contextCards: [
        { id: "gate", title: t("journey.cardTitles.gate"), value: display.gate, disruptionEmphasis: "value" },
        { id: "group", title: t("journey.cardTitles.boardingGroup"), value: flight.boardingGroup },
        { id: "seat", title: t("journey.cardTitles.seat"), value: flight.seat },
        {
          id: "walk",
          title: t("journey.cardTitles.walk"),
          value: display.formatWalkMinutes(travel.walkToGateMinutes),
          detail: t("stages.BOARDING.cardWalkDetail"),
        },
      ],
      flightVisibility: baseFlightVisibility({
        showSummary: false,
        showRoute: false,
        showTerminal: false,
        showBaggage: false,
        compact: true,
      }),
      progressIndex: 7,
      notificationSummary: t("stages.BOARDING.notificationSummary"),
      layout: "focused",
      showProgress: false,
      showWhatChanged: true,
    },

    IN_FLIGHT: {
      eyebrow: t("stages.IN_FLIGHT.eyebrow"),
      heading: t("stages.IN_FLIGHT.heading"),
      reassurance: t("stages.IN_FLIGHT.reassurance"),
      journeyStatus: t("stages.IN_FLIGHT.journeyStatus"),
      pulse: "relaxed",
      urgency: "low",
      nextAction: {
        title: t("stages.IN_FLIGHT.nextActionTitle"),
        timing: display.arrivalTime,
        explanation: t("stages.IN_FLIGHT.nextActionExplanation"),
      },
      whatChanged: t("format.flightOnTimeFor", { time: display.arrivalTime }),
      contextCards: [
        {
          id: "arrival",
          title: t("journey.cardTitles.arrival"),
          value: display.arrivalTime,
          detail: flight.destination.airport,
          disruptionEmphasis: "value",
        },
        {
          id: "weather",
          title: t("journey.cardTitles.melbourne"),
          value: display.destinationTemp,
          detail: weather.destinationCondition,
          weatherIcon: weather.conditionKind,
        },
        {
          id: "local-time",
          title: t("journey.cardTitles.localTime"),
          value: travel.destinationLocalTime,
          detail: t("stages.IN_FLIGHT.cardLocalTimeDetail"),
        },
        {
          id: "hotel",
          title: t("journey.cardTitles.hotel"),
          value: travel.hotelCheckIn,
          detail: travel.hotelStatus,
        },
      ],
      flightVisibility: baseFlightVisibility({
        showGate: false,
        showBoardingGroup: false,
        showTerminal: false,
        compact: true,
      }),
      progressIndex: 8,
      layout: "default",
      showProgress: true,
      showWhatChanged: true,
    },

    ARRIVAL: {
      eyebrow: t("stages.ARRIVAL.eyebrow"),
      heading: t("stages.ARRIVAL.heading"),
      reassurance: t("stages.ARRIVAL.reassurance"),
      journeyStatus: t("stages.ARRIVAL.journeyStatus", {
        carousel: travel.baggageCarousel,
      }),
      pulse: "attentive",
      urgency: "medium",
      nextAction: {
        title: t("format.baggageAt", { carousel: display.carouselLabel }),
        timing: travel.baggageWaitEstimate,
        explanation: t("stages.ARRIVAL.nextActionExplanation"),
      },
      whatChanged: t("format.flightLandedOnTime", { flightNumber: flight.number }),
      contextCards: [
        {
          id: "baggage",
          title: t("journey.cardTitles.carousel"),
          value: travel.baggageCarousel,
          detail: travel.baggageWaitEstimate,
        },
        ...transportOptions.map((option, index) => ({
          id: `transport-${index}`,
          title: t("journey.cardTitles.transport"),
          value: option.split(" · ")[0],
          detail: option.split(" · ")[1],
        })),
        {
          id: "weather",
          title: t("journey.cardTitles.weather"),
          value: display.destinationTemp,
          detail: weather.destinationCondition,
          weatherIcon: weather.conditionKind,
        },
        {
          id: "hotel",
          title: t("journey.cardTitles.hotel"),
          value: travel.hotelCheckIn,
          detail: travel.hotelStatus,
        },
      ],
      flightVisibility: baseFlightVisibility({
        showGate: false,
        showSeat: false,
        showBoardingGroup: false,
        showBaggage: true,
        compact: true,
      }),
      progressIndex: 9,
      layout: "default",
      showProgress: true,
      showWhatChanged: true,
    },

    AFTER_ARRIVAL: {
      eyebrow: t("stages.AFTER_ARRIVAL.eyebrow"),
      heading: t("stages.AFTER_ARRIVAL.heading"),
      reassurance: t("stages.AFTER_ARRIVAL.reassurance"),
      journeyStatus: t("stages.AFTER_ARRIVAL.journeyStatus"),
      pulse: "relaxed",
      urgency: "low",
      nextAction: {
        title: t("stages.AFTER_ARRIVAL.nextActionTitle"),
        timing: t("stages.AFTER_ARRIVAL.nextActionTiming"),
        explanation: t("stages.AFTER_ARRIVAL.nextActionExplanation"),
        actionLabel: t("stages.AFTER_ARRIVAL.nextActionLabel"),
        href: "/journey",
      },
      whatChanged: t("stages.AFTER_ARRIVAL.whatChanged"),
      contextCards: [
        {
          id: "summary",
          title: t("journey.cardTitles.tripSummary"),
          value: t("stages.AFTER_ARRIVAL.cardSummaryValue"),
          detail: t("stages.AFTER_ARRIVAL.cardSummaryDetail", {
            flightNumber: flight.number,
            time: display.arrivalTime,
            city: flight.destination.city,
          }),
        },
        {
          id: "hotel",
          title: t("journey.cardTitles.hotel"),
          value: t("stages.AFTER_ARRIVAL.cardHotelValue"),
          detail: travel.hotelStatus,
        },
        {
          id: "transport",
          title: t("journey.cardTitles.transport"),
          value: t("common.yourCall"),
          detail: transportOptions[0],
        },
      ],
      flightVisibility: baseFlightVisibility({
        showSummary: false,
        showGate: false,
        showSeat: false,
        showBoardingGroup: false,
        showTerminal: false,
        compact: true,
      }),
      progressIndex: 10,
      layout: "minimal",
      showProgress: false,
      showWhatChanged: true,
    },
  };
}

const STAGE_LABEL_KEYS: Record<JourneyStageId, TranslationKey> = {
  PLANNING: "stageLabels.PLANNING",
  WEEK_BEFORE: "stageLabels.WEEK_BEFORE",
  DAY_BEFORE: "stageLabels.DAY_BEFORE",
  CHECK_IN_OPEN: "stageLabels.CHECK_IN_OPEN",
  LEAVING_HOME: "stageLabels.LEAVING_HOME",
  AT_AIRPORT: "stageLabels.AT_AIRPORT",
  AFTER_SECURITY: "stageLabels.AFTER_SECURITY",
  BOARDING: "stageLabels.BOARDING",
  IN_FLIGHT: "stageLabels.IN_FLIGHT",
  ARRIVAL: "stageLabels.ARRIVAL",
  AFTER_ARRIVAL: "stageLabels.AFTER_ARRIVAL",
};

export { JOURNEY_STAGE_IDS };

export function getStageContent(
  stage: JourneyStageId,
  display: JourneyDisplay,
  t: TFunction,
): StageContent {
  return buildStageContentConfig(display, t)[stage];
}

export function getStageLabel(stage: JourneyStageId, t: TFunction): string {
  return t(STAGE_LABEL_KEYS[stage]);
}

export function getJourneyProgressSteps(
  currentStage: JourneyStageId,
  t: TFunction,
): { id: JourneyStageId; label: string; status: "complete" | "current" | "upcoming" }[] {
  const currentIndex = JOURNEY_STAGE_IDS.indexOf(currentStage);

  return JOURNEY_STAGE_IDS.map((id, index) => ({
    id,
    label: getStageLabel(id, t),
    status:
      index < currentIndex
        ? "complete"
        : index === currentIndex
          ? "current"
          : "upcoming",
  }));
}
