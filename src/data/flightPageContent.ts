import { mockJourney } from "@/data/mockJourney";
import type { TFunction, TranslationKey } from "@/i18n/types";
import { translateList } from "@/i18n/translate";
import type {
  FlightDisplayStatus,
  FlightPageContent,
  FlightTimelineStep,
  FlightTimelineStepId,
  JourneyStageId,
} from "@/types/journey";
import type { JourneyDisplay } from "@/types/preferences";

const { flight } = mockJourney;

const FLIGHT_TIMELINE_STEP_LABEL_KEYS = {
  booked: {
    pending: "status.flightTimeline.booked.pending",
    complete: "status.flightTimeline.booked.complete",
  },
  "checked-in": {
    pending: "status.flightTimeline.checkedIn.pending",
    complete: "status.flightTimeline.checkedIn.complete",
  },
  security: {
    pending: "status.flightTimeline.security.pending",
    complete: "status.flightTimeline.security.complete",
  },
  boarding: {
    pending: "status.flightTimeline.boarding.pending",
    complete: "status.flightTimeline.boarding.complete",
  },
  departed: {
    pending: "status.flightTimeline.departed.pending",
    complete: "status.flightTimeline.departed.complete",
  },
  landed: {
    pending: "status.flightTimeline.landed.pending",
    complete: "status.flightTimeline.landed.complete",
  },
} as const satisfies Record<
  FlightTimelineStepId,
  { pending: TranslationKey; complete: TranslationKey }
>;

const FLIGHT_TIMELINE_STEP_IDS: FlightTimelineStepId[] = [
  "booked",
  "checked-in",
  "security",
  "boarding",
  "departed",
  "landed",
];

function getFlightTimelineStepLabel(
  id: FlightTimelineStepId,
  status: FlightTimelineStep["status"],
  t: TFunction,
): string {
  const keys = FLIGHT_TIMELINE_STEP_LABEL_KEYS[id];
  return t(status === "complete" ? keys.complete : keys.pending);
}

function resolveTimelineStepStatus(
  index: number,
  completeThroughIndex: number,
  currentIndex?: number,
): FlightTimelineStep["status"] {
  if (currentIndex !== undefined && index === currentIndex) {
    return "current";
  }

  if (index <= completeThroughIndex) {
    return "complete";
  }

  return "upcoming";
}

function flightDisplayStatus(t: TFunction, key: TranslationKey): FlightDisplayStatus {
  return t(key) as FlightDisplayStatus;
}

function buildFlightPageContentByStage(
  display: JourneyDisplay,
  t: TFunction,
): Record<JourneyStageId, FlightPageContent> {
  const gateLabel = display.gateLabel;
  const carouselLabel = display.carouselLabel;

  return {
    PLANNING: {
      displayStatus: flightDisplayStatus(t, "flight.pages.PLANNING.displayStatus"),
      dateLabel: display.travelDateLabel,
      nextActionMessage: t("flight.pages.PLANNING.nextActionMessage"),
      urgency: "low",
      timelineCompleteThroughIndex: 0,
      helpfulTips: translateList(t, "flight.pages.PLANNING.tips"),
      showBoardingPass: false,
      boardingPassNote: t("flight.boardingPassNoteAfterCheckIn"),
    },

    WEEK_BEFORE: {
      displayStatus: flightDisplayStatus(t, "flight.pages.WEEK_BEFORE.displayStatus"),
      dateLabel: display.travelDateLabel,
      nextActionMessage: t("flight.pages.WEEK_BEFORE.nextActionMessage"),
      urgency: "low",
      timelineCompleteThroughIndex: 0,
      helpfulTips: translateList(t, "flight.pages.WEEK_BEFORE.tips"),
      showBoardingPass: false,
      boardingPassNote: t("flight.boardingPassNoteAfterCheckIn"),
    },

    DAY_BEFORE: {
      displayStatus: flightDisplayStatus(t, "flight.pages.DAY_BEFORE.displayStatus"),
      dateLabel: t("common.tomorrow"),
      nextActionMessage: t("flight.pages.DAY_BEFORE.nextActionMessage"),
      urgency: "low",
      timelineCompleteThroughIndex: 0,
      helpfulTips: translateList(t, "flight.pages.DAY_BEFORE.tips"),
      showBoardingPass: false,
      boardingPassNote: t("flight.boardingPassNoteAfterCheckIn"),
    },

    CHECK_IN_OPEN: {
      displayStatus: flightDisplayStatus(t, "flight.pages.CHECK_IN_OPEN.displayStatus"),
      dateLabel: t("common.today"),
      nextActionMessage: t("flight.pages.CHECK_IN_OPEN.nextActionMessage"),
      urgency: "high",
      timelineCompleteThroughIndex: 0,
      timelineCurrentIndex: 1,
      helpfulTips: translateList(t, "flight.pages.CHECK_IN_OPEN.tips"),
      showBoardingPass: false,
      boardingPassNote: t("flight.boardingPassNoteActivate"),
    },

    LEAVING_HOME: {
      displayStatus: flightDisplayStatus(t, "flight.pages.LEAVING_HOME.displayStatus"),
      dateLabel: t("common.today"),
      nextActionMessage: t("flight.pages.LEAVING_HOME.nextActionMessage", {
        minutes: display.leaveCountdownMinutes,
      }),
      urgency: "high",
      timelineCompleteThroughIndex: 0,
      timelineCurrentIndex: 1,
      helpfulTips: translateList(t, "flight.pages.LEAVING_HOME.tips"),
      showBoardingPass: false,
    },

    AT_AIRPORT: {
      displayStatus: flightDisplayStatus(t, "flight.pages.AT_AIRPORT.displayStatus"),
      dateLabel: t("common.today"),
      nextActionMessage: t("flight.pages.AT_AIRPORT.nextActionMessage"),
      urgency: "medium",
      timelineCompleteThroughIndex: 1,
      timelineCurrentIndex: 2,
      helpfulTips: translateList(t, "flight.pages.AT_AIRPORT.tips", [
        undefined,
        undefined,
        { gate: gateLabel },
      ]),
      showBoardingPass: true,
    },

    AFTER_SECURITY: {
      displayStatus: flightDisplayStatus(t, "flight.pages.AFTER_SECURITY.displayStatus"),
      dateLabel: t("common.today"),
      nextActionMessage: t("flight.pages.AFTER_SECURITY.nextActionMessage", {
        gate: gateLabel,
      }),
      urgency: "medium",
      timelineCompleteThroughIndex: 2,
      helpfulTips: translateList(t, "flight.pages.AFTER_SECURITY.tips", [
        { gate: gateLabel },
        undefined,
        undefined,
      ]),
      showBoardingPass: true,
    },

    BOARDING: {
      displayStatus: flightDisplayStatus(t, "flight.pages.BOARDING.displayStatus"),
      dateLabel: t("common.today"),
      nextActionMessage: t("flight.pages.BOARDING.nextActionMessage", {
        gate: gateLabel,
      }),
      urgency: "high",
      timelineCompleteThroughIndex: 2,
      timelineCurrentIndex: 3,
      helpfulTips: translateList(t, "flight.pages.BOARDING.tips", [
        { group: flight.boardingGroup, gate: gateLabel },
        undefined,
        undefined,
      ]),
      showBoardingPass: true,
    },

    IN_FLIGHT: {
      displayStatus: flightDisplayStatus(t, "flight.pages.IN_FLIGHT.displayStatus"),
      dateLabel: t("common.today"),
      nextActionMessage: t("flight.pages.IN_FLIGHT.nextActionMessage"),
      urgency: "low",
      timelineCompleteThroughIndex: 3,
      timelineCurrentIndex: 4,
      helpfulTips: translateList(t, "flight.pages.IN_FLIGHT.tips", [
        { time: display.arrivalTime },
        undefined,
        undefined,
      ]),
      showBoardingPass: false,
    },

    ARRIVAL: {
      displayStatus: flightDisplayStatus(t, "flight.pages.ARRIVAL.displayStatus"),
      dateLabel: t("common.today"),
      nextActionMessage: t("flight.pages.ARRIVAL.nextActionMessage", {
        carousel: carouselLabel,
      }),
      urgency: "medium",
      timelineCompleteThroughIndex: 4,
      timelineCurrentIndex: 5,
      helpfulTips: translateList(t, "flight.pages.ARRIVAL.tips", [
        { carousel: carouselLabel },
        undefined,
        undefined,
      ]),
      showBoardingPass: false,
    },

    AFTER_ARRIVAL: {
      displayStatus: flightDisplayStatus(t, "flight.pages.AFTER_ARRIVAL.displayStatus"),
      dateLabel: t("common.today"),
      nextActionMessage: t("flight.pages.AFTER_ARRIVAL.nextActionMessage"),
      urgency: "low",
      timelineCompleteThroughIndex: 5,
      helpfulTips: translateList(t, "flight.pages.AFTER_ARRIVAL.tips"),
      showBoardingPass: false,
    },
  };
}

export function getFlightPageContent(
  stage: JourneyStageId,
  display: JourneyDisplay,
  t: TFunction,
): FlightPageContent {
  return buildFlightPageContentByStage(display, t)[stage];
}

export function getFlightTimelineSteps(
  stage: JourneyStageId,
  display: JourneyDisplay,
  t: TFunction,
): FlightTimelineStep[] {
  const { timelineCompleteThroughIndex, timelineCurrentIndex } =
    buildFlightPageContentByStage(display, t)[stage];

  return FLIGHT_TIMELINE_STEP_IDS.map((id, index) => {
    const status = resolveTimelineStepStatus(
      index,
      timelineCompleteThroughIndex,
      timelineCurrentIndex,
    );

    return {
      id,
      label: getFlightTimelineStepLabel(id, status, t),
      status,
    };
  });
}
