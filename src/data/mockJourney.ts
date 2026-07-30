import type { DestinationDiscoverItem, JourneyStageId, MockJourney } from "@/types/journey";

/** Simulated Virgin Australia Brisbane → Melbourne trip for the ReadyGate prototype. */
export const mockJourney: MockJourney = {
  passenger: {
    firstName: "Alex",
    fullName: "Alex Morgan",
  },
  flight: {
    id: "va-313-20260812",
    number: "VA 313",
    airline: "Virgin Australia",
    origin: {
      code: "BNE",
      city: "Brisbane",
      airport: "Brisbane Airport",
      terminal: "Domestic Terminal",
    },
    destination: {
      code: "MEL",
      city: "Melbourne",
      airport: "Melbourne Airport",
      terminal: "Terminal 3",
    },
    scheduledDeparture: "2026-08-12T10:35:00+10:00",
    scheduledArrival: "2026-08-12T13:00:00+10:00",
    boardingTime: "2026-08-12T10:05:00+10:00",
  gate: "42",
  cabinClass: "Business",
  seat: "8A",
    boardingGroup: "Group 2",
    status: "on-time",
    statusLabel: "On time",
    aircraft: "B737-800",
    duration: "2h 25m",
    distance: "1,374 km",
  },
  travel: {
    travelDate: "2026-08-12T00:00:00+10:00",
    daysUntilDeparture: 12,
    suggestedAirportArrival: "8:35 AM",
    recommendedLeaveTime: "8:00 AM",
    suggestedAirportArrivalIso: "2026-08-12T08:35:00+10:00",
    recommendedLeaveTimeIso: "2026-08-12T08:00:00+10:00",
    destinationLocalTimeIso: "2026-08-12T13:05:00+10:00",
    hotelCheckInIso: "2026-08-12T15:00:00+10:00",
    driveMinutes: 35,
    trafficStatus: "Light until 8:15 AM, heavier after",
    securityEstimateMinutes: 15,
    walkToGateMinutes: 6,
    baggageDropStatus: "Virgin Australia counter · Domestic Terminal",
    baggageCarousel: "4",
    baggageWaitEstimate: "About 15 minutes",
    hotelCheckIn: "3:00 PM",
    hotelStatus: "Confirmed · check-in from 3:00 PM",
    destinationLocalTime: "1:05 PM",
    checkInOpens: "24 hours before departure",
    baggageAllowance: "1 checked bag (23 kg) · 1 carry-on (7 kg)",
    bookingReference: "K7M4P2",
  },
  weather: {
    destinationTemp: "15°C",
    destinationTempC: 15,
    destinationCondition: "Light rain",
    destinationOutlook: "Light rain on arrival. Pack a jacket.",
    conditionKind: "light-rain",
  },
  checklist: [
    { id: "passport", label: "Photo ID ready", complete: true },
    { id: "seat", label: "Seat selected", complete: true },
    { id: "bags", label: "Baggage allowance reviewed", complete: false },
    { id: "transport", label: "Airport transport planned", complete: false },
  ],
  documents: [
    { id: "id", label: "Photo ID", status: "Ready" },
    { id: "boarding-pass", label: "Boarding pass", status: "Available after check-in" },
    { id: "booking", label: "Booking reference", status: "K7M4P2" },
  ],
  preparationTasks: [
    "Confirm airport parking or ride",
    "Review carry-on liquids limits",
  ],
  nearbyOptions: [
    "Coffee · Gate lounge · near Gate 42",
    "Food · Departures level · Domestic Terminal",
    "Restrooms · Near Gate 42",
  ],
  transportOptions: [
    "SkyBus to Southern Cross · every 10 min",
    "Taxi rank · Terminal 3 ground level",
    "Rideshare · Pick-up Zone B",
  ],
  tripWindowLabel: "12–14 August",
  flightAmenities: {
    cabin: "Economy",
    meal: "Snack available for purchase",
    wifi: "Available",
    power: "USB-A at every seat",
    entertainment: "Streaming via personal device",
  },
  hotel: {
    name: "Victoria Hotel Melbourne",
    address: "215 Little Collins Street, Melbourne VIC 3000",
    checkInTime: "3:00 PM",
    distance: "22 km from Melbourne Airport",
    travelTime: "About 25 minutes",
    earlyArrivalNote:
      "Reception can store bags before check-in.",
  },
  localInfo: {
    sunset: "5:42 PM",
    currency: "AUD",
    emergency: "000",
    powerPlug: "Type I",
    timezone: "AEST (UTC+10)",
  },
  transportModes: [
    {
      id: "skybus",
      name: "SkyBus",
      duration: "25 min to Southern Cross",
      cost: "From $24",
      icon: "bus",
    },
    {
      id: "taxi",
      name: "Taxi",
      duration: "30 min to city",
      cost: "Approx. $55–65",
      icon: "taxi",
    },
    {
      id: "uber",
      name: "Uber",
      duration: "28 min to hotel",
      cost: "Approx. $45–55",
      icon: "rideshare",
    },
    {
      id: "rental",
      name: "Rental car",
      duration: "Pick-up at Terminal 3",
      cost: "From $65/day",
      icon: "car",
    },
  ],
  discoverAtArrival: [
    { id: "skybus", label: "SkyBus tickets", detail: "Terminal 3 · ground floor" },
    { id: "atm", label: "ATM", detail: "Arrivals hall · Terminal 3" },
    { id: "coffee", label: "Coffee", detail: "Terminal 3 · before exit" },
    { id: "pharmacy", label: "Pharmacy", detail: "T3 concourse · open until 9 PM" },
  ],
  discoverInCity: [
    { id: "coffee", label: "Coffee", detail: "Degraves Street", walkDistanceMeters: 350 },
    { id: "lunch", label: "Lunch", detail: "Block Place", walkDistanceMeters: 290 },
    { id: "pharmacy", label: "Pharmacy", detail: "Chemist Warehouse · Collins Street" },
    { id: "supermarket", label: "Supermarket", detail: "Coles Central", walkDistanceMeters: 220 },
  ],
};

export function getDiscoverForStage(stage: JourneyStageId): DestinationDiscoverItem[] {
  return stage === "AFTER_ARRIVAL"
    ? mockJourney.discoverInCity
    : mockJourney.discoverAtArrival;
}
