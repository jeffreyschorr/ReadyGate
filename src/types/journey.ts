export const JOURNEY_STAGE_IDS = [
  "PLANNING",
  "WEEK_BEFORE",
  "DAY_BEFORE",
  "CHECK_IN_OPEN",
  "LEAVING_HOME",
  "AT_AIRPORT",
  "AFTER_SECURITY",
  "BOARDING",
  "IN_FLIGHT",
  "ARRIVAL",
  "AFTER_ARRIVAL",
] as const;

export type JourneyStageId = (typeof JOURNEY_STAGE_IDS)[number];

export type JourneyPulseState = "relaxed" | "attentive" | "action-required";

export type UrgencyLevel = "low" | "medium" | "high";

export type HomeLayoutMode = "default" | "focused" | "minimal";

export type WeatherConditionKind =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "light-rain"
  | "rain"
  | "storm";

export type ContextCardData = {
  id: string;
  title: string;
  value: string;
  detail?: string;
  weatherIcon?: WeatherConditionKind;
  /** When disruption is active, emphasize the value and/or detail in accent red. */
  disruptionEmphasis?: "value" | "detail" | "both";
};

export type NextActionContent = {
  title: string;
  timing?: string;
  explanation: string;
  actionLabel?: string;
  href?: string;
};

export type FlightInfoVisibility = {
  showSummary: boolean;
  showGate: boolean;
  showSeat: boolean;
  showBoardingGroup: boolean;
  showTerminal: boolean;
  showBaggage: boolean;
  showRoute: boolean;
  compact: boolean;
};

export type StageContent = {
  eyebrow: string;
  heading: string;
  reassurance: string;
  journeyStatus: string;
  pulse: JourneyPulseState;
  urgency: UrgencyLevel;
  nextAction: NextActionContent;
  whatChanged: string;
  contextCards: ContextCardData[];
  flightVisibility: FlightInfoVisibility;
  progressIndex: number;
  notificationSummary?: string;
  layout: HomeLayoutMode;
  showProgress: boolean;
  showWhatChanged: boolean;
};

export type MockJourneyPassenger = {
  firstName: string;
  fullName: string;
};

export type MockJourneyAirport = {
  code: string;
  city: string;
  airport: string;
  terminal?: string;
};

export type MockJourneyFlight = {
  id: string;
  number: string;
  airline: string;
  origin: MockJourneyAirport;
  destination: MockJourneyAirport;
  scheduledDeparture: string;
  scheduledArrival: string;
  boardingTime: string;
  gate: string;
  cabinClass: string;
  seat: string;
  boardingGroup: string;
  status: "on-time" | "delayed" | "boarding" | "departed" | "landed";
  statusLabel: string;
  aircraft: string;
  duration: string;
  distance: string;
};

export type MockJourneyFlightAmenities = {
  cabin: string;
  meal: string;
  wifi: string;
  power: string;
  entertainment: string;
};

export type MockJourneyTravel = {
  travelDate: string;
  daysUntilDeparture: number;
  suggestedAirportArrival: string;
  recommendedLeaveTime: string;
  suggestedAirportArrivalIso: string;
  recommendedLeaveTimeIso: string;
  destinationLocalTimeIso: string;
  hotelCheckInIso: string;
  driveMinutes: number;
  trafficStatus: string;
  securityEstimateMinutes: number;
  walkToGateMinutes: number;
  baggageDropStatus: string;
  baggageCarousel: string;
  baggageWaitEstimate: string;
  hotelCheckIn: string;
  hotelStatus: string;
  destinationLocalTime: string;
  checkInOpens: string;
  baggageAllowance: string;
  bookingReference: string;
};

export type MockJourneyWeather = {
  destinationTemp: string;
  destinationTempC: number;
  destinationCondition: string;
  destinationOutlook: string;
  conditionKind: WeatherConditionKind;
};

export type MockJourneyChecklistItem = {
  id: string;
  label: string;
  complete: boolean;
};

export type MockJourneyDocument = {
  id: string;
  label: string;
  status: string;
};

export type MockJourney = {
  passenger: MockJourneyPassenger;
  flight: MockJourneyFlight;
  travel: MockJourneyTravel;
  weather: MockJourneyWeather;
  checklist: MockJourneyChecklistItem[];
  documents: MockJourneyDocument[];
  preparationTasks: string[];
  nearbyOptions: string[];
  transportOptions: string[];
  tripWindowLabel: string;
  flightAmenities: MockJourneyFlightAmenities;
  hotel: MockJourneyHotel;
  localInfo: MockJourneyLocalInfo;
  transportModes: DestinationTransportOption[];
  discoverAtArrival: DestinationDiscoverItem[];
  discoverInCity: DestinationDiscoverItem[];
};

export type JourneyProgressStep = {
  id: JourneyStageId;
  label: string;
  status: "complete" | "current" | "upcoming";
};

export type MilestoneStatus = "complete" | "current" | "upcoming";

export type MilestoneDetail = {
  label: string;
  value: string;
  detail?: string;
};

export type JourneyMilestoneDefinition = {
  id: string;
  title: string;
  time: string;
  description: string;
  whyItMatters: string;
  details: MilestoneDetail[];
};

export type JourneyMilestone = JourneyMilestoneDefinition & {
  status: MilestoneStatus;
};

export type LookingAheadEvent = {
  id: string;
  title: string;
  time: string;
  detail?: string;
};

export type FlightDisplayStatus =
  | "Scheduled"
  | "Check-in Open"
  | "Boarding"
  | "In Flight"
  | "Landed";

export type FlightTimelineStepId =
  | "booked"
  | "checked-in"
  | "security"
  | "boarding"
  | "departed"
  | "landed";

export type FlightTimelineStep = {
  id: FlightTimelineStepId;
  label: string;
  status: "complete" | "current" | "upcoming";
};

export type FlightPageContent = {
  displayStatus: FlightDisplayStatus;
  dateLabel: string;
  nextActionMessage: string;
  urgency: UrgencyLevel;
  timelineCompleteThroughIndex: number;
  timelineCurrentIndex?: number;
  helpfulTips: string[];
  showBoardingPass: boolean;
  boardingPassNote?: string;
};

export type DestinationPageMode =
  | "preview"
  | "preparing"
  | "in-flight"
  | "arrival"
  | "after-arrival";

export type DestinationStepId =
  | "land"
  | "baggage"
  | "transport"
  | "hotel"
  | "free-time";

export type DestinationStepDefinition = {
  id: DestinationStepId;
  icon: string;
  title: string;
  estimatedTime: string;
  description: string;
};

export type DestinationStep = DestinationStepDefinition & {
  status: "complete" | "current" | "upcoming";
};

export type DestinationTransportOption = {
  id: string;
  name: string;
  duration: string;
  cost: string;
  icon: "bus" | "taxi" | "rideshare" | "car" | "walk";
};

export type DestinationDiscoverItem = {
  id: string;
  label: string;
  detail: string;
  walkDistanceMeters?: number;
};

export type MockJourneyHotel = {
  name: string;
  address: string;
  checkInTime: string;
  distance: string;
  travelTime: string;
  earlyArrivalNote: string;
};

export type MockJourneyLocalInfo = {
  sunset: string;
  currency: string;
  emergency: string;
  powerPlug: string;
  timezone: string;
};

export type DestinationPageContent = {
  mode: DestinationPageMode;
  headerTagline: string;
  heroTitle: string;
  heroSummary: string;
  nextStepsTitle: string;
  nextStepsActiveIndex: number | null;
  showTransportProminent: boolean;
  showHotelProminent: boolean;
  showDiscover: boolean;
  reminders: string[];
};

export type UpdatesPageContent = {
  showEmptyState: boolean;
  updates: UpdateItem[];
};

export type UpdateFilterId = "all" | "important" | "flight" | "journey" | "destination";

export type UpdateCategory = "flight" | "journey" | "destination";

export type UpdateImportance = "normal" | "important" | "critical";

export type UpdateIconType =
  | "gate"
  | "check-in"
  | "weather"
  | "boarding"
  | "baggage"
  | "transport"
  | "reminder"
  | "schedule";

export type UpdateItem = {
  id: string;
  category: UpdateCategory;
  importance: UpdateImportance;
  icon: UpdateIconType;
  title: string;
  message: string;
  relativeTime: string;
};

export type HealthStatus = "ready" | "attention" | "pending";

export type JourneyHealthItem = {
  id: string;
  label: string;
  status: HealthStatus;
  detail: string;
};

export type CountdownContent = {
  label: string;
  display: string;
};

export type RefinementContent = {
  countdown: CountdownContent | null;
  health: JourneyHealthItem[];
};
