export type AppLanguage = "en" | "ja" | "fr";

export type TimeFormat = "12" | "24";

export type DistanceUnit = "metric" | "imperial";

export type TemperatureUnit = "celsius" | "fahrenheit";

export type TransportPreference =
  | "taxi"
  | "rideshare"
  | "public"
  | "rental"
  | "walking";

export type HomeAirport = {
  code: string;
  city: string;
};

export type FrequentFlyer = {
  programme: string;
  tier: string;
};

export type NotificationPreferences = {
  journeyUpdates: boolean;
  boardingReminders: boolean;
  flightChanges: boolean;
  inAppAlerts: boolean;
  pushNotifications: boolean;
};

export type TravellerPreferences = {
  language: AppLanguage;
  timeFormat: TimeFormat;
  distanceUnit: DistanceUnit;
  temperatureUnit: TemperatureUnit;
  largerText: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  biometricSignIn: boolean;
  notifications: NotificationPreferences;
  homeAirport: HomeAirport;
  /** Typical travel time from home to the departure airport, in minutes. */
  homeToAirportMinutes: number;
  preferredTransport: TransportPreference;
  frequentFlyer: FrequentFlyer;
};

export type JourneyDisplay = {
  travelDateLabel: string;
  departureTime: string;
  boardingTime: string;
  arrivalTime: string;
  gateLabel: string;
  gate: string;
  carouselLabel: string;
  flightNumber: string;
  hotelName: string;
  recommendedLeaveTime: string;
  suggestedAirportArrival: string;
  destinationLocalTime: string;
  hotelCheckIn: string;
  destinationTemp: string;
  driveMinutes: number;
  leaveCountdownMinutes: number;
  formatWalkMinutes: (minutes: number) => string;
  formatDriveMinutes: (minutes: number) => string;
  formatDurationMinutes: (minutes: number) => string;
  formatWalkMeters: (meters: number) => string;
};
