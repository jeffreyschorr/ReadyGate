import { mockJourney } from "@/data/mockJourney";

/** Demo assumes the traveller is this many minutes before recommended leave at LEAVING_HOME. */
export const LEAVING_HOME_DEMO_BUFFER_MINUTES = 20;

export type ComputedTravelTiming = {
  driveMinutes: number;
  recommendedLeaveTimeIso: string;
  leaveCountdownMinutes: number;
};

function subtractMinutes(isoDate: string, minutes: number): string {
  const date = new Date(isoDate);
  date.setMinutes(date.getMinutes() - minutes);
  return date.toISOString();
}

export function computeTravelTiming(
  homeToAirportMinutes: number,
): ComputedTravelTiming {
  const { suggestedAirportArrivalIso } = mockJourney.travel;

  return {
    driveMinutes: homeToAirportMinutes,
    recommendedLeaveTimeIso: subtractMinutes(
      suggestedAirportArrivalIso,
      homeToAirportMinutes,
    ),
    leaveCountdownMinutes: LEAVING_HOME_DEMO_BUFFER_MINUTES,
  };
}
