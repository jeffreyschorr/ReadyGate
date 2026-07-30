import { mockJourney } from "@/data/mockJourney";
import { createTranslator } from "@/i18n/translate";
import {
  createFormatters,
  defaultPreferences,
} from "@/lib/preferences-format";
import type { Formatters } from "@/lib/preferences-format";
import type { TFunction } from "@/i18n/types";
import { computeTravelTiming } from "@/lib/travel-timing";
import type { JourneyDisplay, TravellerPreferences } from "@/types/preferences";

export function buildJourneyDisplay(
  formatters: Formatters,
  t: TFunction,
  homeToAirportMinutes: number = defaultPreferences.homeToAirportMinutes,
): JourneyDisplay {
  const { flight, travel, hotel, weather } = mockJourney;
  const timing = computeTravelTiming(homeToAirportMinutes);

  return {
    travelDateLabel: formatters.formatTravelDate(travel.travelDate),
    departureTime: formatters.formatTime(flight.scheduledDeparture),
    boardingTime: formatters.formatTime(flight.boardingTime),
    arrivalTime: formatters.formatTime(flight.scheduledArrival),
    gateLabel: `${t("common.gate")} ${flight.gate}`,
    gate: flight.gate,
    carouselLabel: `${t("journey.cardTitles.carousel")} ${travel.baggageCarousel}`,
    flightNumber: flight.number,
    hotelName: hotel.name,
    recommendedLeaveTime: formatters.formatTime(timing.recommendedLeaveTimeIso),
    suggestedAirportArrival: formatters.formatTime(
      travel.suggestedAirportArrivalIso,
    ),
    destinationLocalTime: formatters.formatTime(travel.destinationLocalTimeIso),
    hotelCheckIn: formatters.formatTime(travel.hotelCheckInIso),
    destinationTemp: formatters.formatTemperature(weather.destinationTempC),
    driveMinutes: timing.driveMinutes,
    leaveCountdownMinutes: timing.leaveCountdownMinutes,
    formatWalkMinutes: formatters.formatWalkMinutes,
    formatDriveMinutes: formatters.formatDriveMinutes,
    formatDurationMinutes: formatters.formatDurationMinutes,
    formatWalkMeters: formatters.formatWalkMeters,
  };
}

export function journeyDisplayFromPreferences(
  prefs: Pick<
    TravellerPreferences,
    | "timeFormat"
    | "distanceUnit"
    | "temperatureUnit"
    | "language"
    | "homeToAirportMinutes"
  >,
  t: TFunction,
): JourneyDisplay {
  return buildJourneyDisplay(
    createFormatters({
      timeFormat: prefs.timeFormat,
      distanceUnit: prefs.distanceUnit,
      temperatureUnit: prefs.temperatureUnit,
      locale: prefs.language,
      t,
    }),
    t,
    prefs.homeToAirportMinutes,
  );
}

const defaultT = createTranslator("en");

export const defaultJourneyDisplay = buildJourneyDisplay(
  createFormatters({
    ...defaultPreferences,
    locale: "en",
    t: defaultT,
  }),
  defaultT,
);
