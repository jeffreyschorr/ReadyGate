import { mockJourney } from "@/data/mockJourney";
import type { TFunction } from "@/i18n/types";
import { translateList } from "@/i18n/translate";
import type {
  DestinationPageContent,
  DestinationStep,
  DestinationStepDefinition,
  JourneyStageId,
} from "@/types/journey";
import type { JourneyDisplay } from "@/types/preferences";

const { travel, weather } = mockJourney;

function buildDestinationStepDefinitions(
  display: JourneyDisplay,
  t: TFunction,
): DestinationStepDefinition[] {
  return [
    {
      id: "land",
      icon: "✈",
      title: t("destination.steps.land.title"),
      estimatedTime: display.arrivalTime,
      description: t("destination.steps.land.description"),
    },
    {
      id: "baggage",
      icon: "🧳",
      title: t("destination.steps.baggage.title"),
      estimatedTime: travel.baggageWaitEstimate,
      description: t("destination.steps.baggage.description", {
        carousel: travel.baggageCarousel,
      }),
    },
    {
      id: "transport",
      icon: "🚆",
      title: t("destination.steps.transport.title"),
      estimatedTime: mockJourney.hotel.travelTime,
      description: t("destination.steps.transport.description"),
    },
    {
      id: "hotel",
      icon: "🏨",
      title: t("destination.steps.hotel.title"),
      estimatedTime: display.hotelCheckIn,
      description: t("destination.steps.hotel.description", {
        hotelName: mockJourney.hotel.name,
        time: display.hotelCheckIn,
      }),
    },
    {
      id: "free-time",
      icon: "☕",
      title: t("destination.steps.freeTime.title"),
      estimatedTime: t("destination.steps.freeTime.time"),
      description: t("destination.steps.freeTime.description"),
    },
  ];
}

function buildDestinationPageContentByStage(
  display: JourneyDisplay,
  t: TFunction,
): Record<JourneyStageId, DestinationPageContent> {
  const previewTagline = t("destination.shared.previewTagline");

  return {
    PLANNING: {
      mode: "preview",
      headerTagline: previewTagline,
      heroTitle: t("destination.pages.PLANNING.heroTitle"),
      heroSummary: t("destination.pages.PLANNING.heroSummary"),
      nextStepsTitle: t("destination.shared.afterYouArrive"),
      nextStepsActiveIndex: null,
      showTransportProminent: false,
      showHotelProminent: true,
      showDiscover: false,
      reminders: translateList(t, "destination.pages.PLANNING.reminders"),
    },

    WEEK_BEFORE: {
      mode: "preview",
      headerTagline: previewTagline,
      heroTitle: t("destination.pages.WEEK_BEFORE.heroTitle"),
      heroSummary: t("destination.pages.WEEK_BEFORE.heroSummary"),
      nextStepsTitle: t("destination.shared.afterYouArrive"),
      nextStepsActiveIndex: null,
      showTransportProminent: false,
      showHotelProminent: true,
      showDiscover: false,
      reminders: translateList(t, "destination.pages.WEEK_BEFORE.reminders"),
    },

    DAY_BEFORE: {
      mode: "preview",
      headerTagline: previewTagline,
      heroTitle: t("destination.pages.DAY_BEFORE.heroTitle"),
      heroSummary: t("destination.pages.DAY_BEFORE.heroSummary", {
        time: display.arrivalTime,
      }),
      nextStepsTitle: t("destination.shared.afterYouArrive"),
      nextStepsActiveIndex: null,
      showTransportProminent: false,
      showHotelProminent: true,
      showDiscover: false,
      reminders: translateList(t, "destination.pages.DAY_BEFORE.reminders"),
    },

    CHECK_IN_OPEN: {
      mode: "preview",
      headerTagline: previewTagline,
      heroTitle: t("destination.pages.CHECK_IN_OPEN.heroTitle"),
      heroSummary: t("destination.pages.CHECK_IN_OPEN.heroSummary"),
      nextStepsTitle: t("destination.shared.afterYouArrive"),
      nextStepsActiveIndex: null,
      showTransportProminent: false,
      showHotelProminent: false,
      showDiscover: false,
      reminders: translateList(t, "destination.pages.CHECK_IN_OPEN.reminders"),
    },

    LEAVING_HOME: {
      mode: "preview",
      headerTagline: previewTagline,
      heroTitle: t("destination.pages.LEAVING_HOME.heroTitle"),
      heroSummary: t("destination.pages.LEAVING_HOME.heroSummary"),
      nextStepsTitle: t("destination.shared.afterYouArrive"),
      nextStepsActiveIndex: null,
      showTransportProminent: false,
      showHotelProminent: false,
      showDiscover: false,
      reminders: translateList(t, "destination.pages.LEAVING_HOME.reminders"),
    },

    AT_AIRPORT: {
      mode: "preview",
      headerTagline: previewTagline,
      heroTitle: t("destination.pages.AT_AIRPORT.heroTitle"),
      heroSummary: t("destination.pages.AT_AIRPORT.heroSummary", {
        hotelName: display.hotelName,
      }),
      nextStepsTitle: t("destination.shared.afterYouArrive"),
      nextStepsActiveIndex: null,
      showTransportProminent: false,
      showHotelProminent: false,
      showDiscover: false,
      reminders: translateList(t, "destination.pages.AT_AIRPORT.reminders", [
        { hotelName: display.hotelName },
      ]),
    },

    AFTER_SECURITY: {
      mode: "preview",
      headerTagline: previewTagline,
      heroTitle: t("destination.pages.AFTER_SECURITY.heroTitle"),
      heroSummary: t("destination.pages.AFTER_SECURITY.heroSummary"),
      nextStepsTitle: t("destination.shared.afterYouArrive"),
      nextStepsActiveIndex: null,
      showTransportProminent: false,
      showHotelProminent: false,
      showDiscover: false,
      reminders: translateList(t, "destination.pages.AFTER_SECURITY.reminders"),
    },

    BOARDING: {
      mode: "preparing",
      headerTagline: t("destination.shared.beforeYouLand"),
      heroTitle: t("destination.pages.BOARDING.heroTitle"),
      heroSummary: t("destination.pages.BOARDING.heroSummary"),
      nextStepsTitle: t("destination.shared.arrivalSteps"),
      nextStepsActiveIndex: 0,
      showTransportProminent: false,
      showHotelProminent: true,
      showDiscover: false,
      reminders: translateList(t, "destination.pages.BOARDING.reminders"),
    },

    IN_FLIGHT: {
      mode: "in-flight",
      headerTagline: t("destination.shared.afterLandingTagline"),
      heroTitle: t("destination.pages.IN_FLIGHT.heroTitle"),
      heroSummary: t("destination.pages.IN_FLIGHT.heroSummary", {
        time: display.arrivalTime,
        hotelName: display.hotelName,
      }),
      nextStepsTitle: t("destination.shared.afterLanding"),
      nextStepsActiveIndex: 0,
      showTransportProminent: false,
      showHotelProminent: true,
      showDiscover: false,
      reminders: translateList(t, "destination.pages.IN_FLIGHT.reminders", [
        { carousel: travel.baggageCarousel },
        undefined,
        undefined,
      ]),
    },

    ARRIVAL: {
      mode: "arrival",
      headerTagline: t("destination.shared.melbourne"),
      heroTitle: t("destination.pages.ARRIVAL.heroTitle"),
      heroSummary: t("destination.pages.ARRIVAL.heroSummary", {
        temp: display.destinationTemp,
        condition: weather.destinationCondition.toLowerCase(),
        localTime: display.destinationLocalTime,
      }),
      nextStepsTitle: t("destination.shared.nextSteps"),
      nextStepsActiveIndex: 2,
      showTransportProminent: true,
      showHotelProminent: true,
      showDiscover: true,
      reminders: translateList(t, "destination.pages.ARRIVAL.reminders"),
    },

    AFTER_ARRIVAL: {
      mode: "after-arrival",
      headerTagline: t("destination.shared.settleIn"),
      heroTitle: t("destination.pages.AFTER_ARRIVAL.heroTitle"),
      heroSummary: t("destination.pages.AFTER_ARRIVAL.heroSummary"),
      nextStepsTitle: t("destination.shared.nextSteps"),
      nextStepsActiveIndex: 3,
      showTransportProminent: false,
      showHotelProminent: true,
      showDiscover: true,
      reminders: translateList(t, "destination.pages.AFTER_ARRIVAL.reminders"),
    },
  };
}

export function getDestinationPageContent(
  stage: JourneyStageId,
  display: JourneyDisplay,
  t: TFunction,
): DestinationPageContent {
  return buildDestinationPageContentByStage(display, t)[stage];
}

export function getDestinationSteps(
  stage: JourneyStageId,
  display: JourneyDisplay,
  t: TFunction,
): DestinationStep[] {
  const activeIndex =
    buildDestinationPageContentByStage(display, t)[stage].nextStepsActiveIndex;

  return buildDestinationStepDefinitions(display, t).map((step, index) => {
    if (activeIndex === null) {
      return { ...step, status: "upcoming" as const };
    }

    return {
      ...step,
      status:
        index < activeIndex
          ? "complete"
          : index === activeIndex
            ? "current"
            : "upcoming",
    };
  });
}
