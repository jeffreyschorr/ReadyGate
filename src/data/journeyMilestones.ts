import { mockJourney } from "@/data/mockJourney";
import type { TFunction } from "@/i18n/types";
import type {
  JourneyMilestone,
  JourneyMilestoneDefinition,
  JourneyStageId,
  LookingAheadEvent,
  MilestoneStatus,
} from "@/types/journey";
import type { JourneyDisplay } from "@/types/preferences";

const { flight, travel, weather } = mockJourney;

function buildJourneyMilestoneDefinitions(
  display: JourneyDisplay,
  t: TFunction,
): JourneyMilestoneDefinition[] {
  return [
    {
      id: "planning",
      title: t("journey.milestones.planning.title"),
      time: t("journey.milestones.planning.time"),
      description: t("journey.milestones.planning.description"),
      whyItMatters: t("journey.milestones.planning.whyItMatters"),
      details: [
        {
          label: t("journey.milestoneDetailLabels.seat"),
          value: flight.seat,
          detail: flight.boardingGroup,
        },
        {
          label: t("journey.milestoneDetailLabels.baggage"),
          value: t("format.oneCheckedOneCarryOn"),
          detail: travel.baggageAllowance,
        },
        {
          label: t("journey.milestoneDetailLabels.status"),
          value: t("journey.milestones.planning.detailStatus"),
          detail: t("journey.milestones.planning.detailStatusDetail", {
            days: travel.daysUntilDeparture,
          }),
        },
      ],
    },
    {
      id: "check-in",
      title: t("journey.milestones.checkIn.title"),
      time: t("journey.milestones.checkIn.time"),
      description: t("journey.milestones.checkIn.description"),
      whyItMatters: t("journey.milestones.checkIn.whyItMatters"),
      details: [
        {
          label: t("journey.milestoneDetailLabels.seat"),
          value: flight.seat,
          detail: t("journey.milestones.planning.detailSeatDetail"),
        },
        {
          label: t("journey.milestoneDetailLabels.boardingPass"),
          value: t("journey.milestones.planning.detailBoardingPassValue"),
          detail: t("journey.milestones.planning.detailBoardingPassDetail"),
        },
        {
          label: t("journey.milestoneDetailLabels.status"),
          value: t("journey.milestones.planning.detailStatusReady"),
        },
      ],
    },
    {
      id: "leave-home",
      title: t("journey.milestones.leaveHome.title"),
      time: t("journey.milestones.leaveHome.time", {
        time: display.recommendedLeaveTime,
      }),
      description: t("journey.milestones.leaveHome.description"),
      whyItMatters: t("journey.milestones.leaveHome.whyItMatters"),
      details: [
        {
          label: t("journey.milestoneDetailLabels.drive"),
          value: t("format.aboutMinutes", { minutes: display.driveMinutes }),
          detail: travel.trafficStatus,
        },
        {
          label: t("journey.milestoneDetailLabels.airportArrival"),
          value: display.suggestedAirportArrival,
        },
        {
          label: t("journey.milestoneDetailLabels.status"),
          value: t("journey.milestones.leaveHome.detailStatusEnough"),
        },
      ],
    },
    {
      id: "airport",
      title: t("journey.milestones.airport.title"),
      time: t("journey.milestones.airport.time", {
        time: travel.suggestedAirportArrival,
      }),
      description: t("journey.milestones.airport.description", {
        terminal: flight.origin.terminal ?? t("common.domesticTerminal"),
      }),
      whyItMatters: t("journey.milestones.airport.whyItMatters"),
      details: [
        {
          label: t("journey.milestoneDetailLabels.terminal"),
          value: flight.origin.terminal ?? t("common.domesticTerminal"),
          detail: flight.origin.airport,
        },
        {
          label: t("journey.milestoneDetailLabels.baggageDrop"),
          value: t("journey.milestones.airport.detailBaggageDropValue"),
          detail: travel.baggageDropStatus,
        },
        {
          label: t("journey.milestoneDetailLabels.status"),
          value: t("common.onTime"),
        },
      ],
    },
    {
      id: "security",
      title: t("journey.milestones.security.title"),
      time: t("journey.milestones.security.time"),
      description: t("journey.milestones.security.description"),
      whyItMatters: t("journey.milestones.security.whyItMatters"),
      details: [
        {
          label: t("journey.milestoneDetailLabels.wait"),
          value: t("format.aboutMinutes", { minutes: travel.securityEstimateMinutes }),
          detail: t("common.standardQueue"),
        },
        {
          label: t("journey.milestoneDetailLabels.gate"),
          value: display.gate,
          detail: t("journey.milestones.security.detailGateDetail", {
            walk: display.formatWalkMinutes(travel.walkToGateMinutes),
          }),
        },
        {
          label: t("journey.milestoneDetailLabels.status"),
          value: t("journey.milestones.security.detailStatusAhead"),
        },
      ],
    },
    {
      id: "boarding",
      title: t("journey.milestones.boarding.title"),
      time: t("journey.milestones.boarding.time", { time: display.boardingTime }),
      description: t("journey.milestones.boarding.description", {
        group: flight.boardingGroup,
        gate: display.gate,
      }),
      whyItMatters: t("format.priorityGroupsFirst", { seat: flight.seat }),
      details: [
        {
          label: t("journey.milestoneDetailLabels.gate"),
          value: display.gate,
        },
        {
          label: t("journey.milestoneDetailLabels.boardingGroup"),
          value: flight.boardingGroup,
        },
        {
          label: t("journey.milestoneDetailLabels.seat"),
          value: flight.seat,
        },
      ],
    },
    {
      id: "flight",
      title: t("journey.milestones.flight.title"),
      time: t("journey.milestones.flight.time", {
        departure: display.departureTime,
        arrival: display.arrivalTime,
      }),
      description: t("journey.milestones.flight.description", {
        flightNumber: flight.number,
        city: flight.destination.city,
      }),
      whyItMatters: t("journey.milestones.flight.whyItMatters"),
      details: [
        {
          label: t("journey.milestoneDetailLabels.flight"),
          value: flight.number,
          detail: flight.statusLabel,
        },
        {
          label: t("journey.milestoneDetailLabels.arrival"),
          value: display.arrivalTime,
          detail: flight.destination.airport,
        },
        {
          label: t("journey.milestoneDetailLabels.weather"),
          value: display.destinationTemp,
          detail: weather.destinationCondition,
        },
      ],
    },
    {
      id: "arrival",
      title: t("journey.milestones.arrival.title"),
      time: t("journey.milestones.arrival.time", { time: display.arrivalTime }),
      description: t("journey.milestones.arrival.description"),
      whyItMatters: t("journey.milestones.arrival.whyItMatters"),
      details: [
        {
          label: t("journey.milestoneDetailLabels.carousel"),
          value: travel.baggageCarousel,
          detail: travel.baggageWaitEstimate,
        },
        {
          label: t("journey.milestoneDetailLabels.weather"),
          value: display.destinationTemp,
          detail: weather.destinationCondition,
        },
        {
          label: t("journey.milestoneDetailLabels.localTime"),
          value: travel.destinationLocalTime,
        },
      ],
    },
    {
      id: "hotel",
      title: t("journey.milestones.hotel.title"),
      time: t("journey.milestones.hotel.time", { time: travel.hotelCheckIn }),
      description: t("journey.milestones.hotel.description"),
      whyItMatters: t("journey.milestones.hotel.whyItMatters"),
      details: [
        {
          label: t("journey.milestoneDetailLabels.checkIn"),
          value: travel.hotelCheckIn,
          detail: travel.hotelStatus,
        },
        {
          label: t("journey.milestoneDetailLabels.transport"),
          value: t("journey.milestones.hotel.detailTransportValue"),
          detail: mockJourney.transportOptions[0],
        },
        {
          label: t("journey.milestoneDetailLabels.status"),
          value: t("common.confirmed"),
        },
      ],
    },
  ];
}

/** Maps demo stage to the active journey-page milestone index. */
export const stageToMilestoneIndex: Record<JourneyStageId, number> = {
  PLANNING: 0,
  WEEK_BEFORE: 0,
  DAY_BEFORE: 1,
  CHECK_IN_OPEN: 1,
  LEAVING_HOME: 2,
  AT_AIRPORT: 3,
  AFTER_SECURITY: 4,
  BOARDING: 5,
  IN_FLIGHT: 6,
  ARRIVAL: 7,
  AFTER_ARRIVAL: 8,
};

function milestoneStatus(
  index: number,
  activeIndex: number,
): MilestoneStatus {
  if (index < activeIndex) return "complete";
  if (index === activeIndex) return "current";
  return "upcoming";
}

export function getJourneyMilestones(
  stage: JourneyStageId,
  display: JourneyDisplay,
  t: TFunction,
): JourneyMilestone[] {
  const activeIndex = stageToMilestoneIndex[stage];

  return buildJourneyMilestoneDefinitions(display, t).map((definition, index) => ({
    ...definition,
    status: milestoneStatus(index, activeIndex),
  }));
}

export function getLookingAheadEvents(
  stage: JourneyStageId,
  display: JourneyDisplay,
  t: TFunction,
  limit = 4,
): LookingAheadEvent[] {
  const milestones = getJourneyMilestones(stage, display, t);

  return milestones
    .filter((milestone) => milestone.status === "upcoming")
    .slice(0, limit)
    .map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      time: milestone.time,
      detail: milestone.description,
    }));
}
