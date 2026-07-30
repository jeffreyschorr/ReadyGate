import { homeAirportOptions, homeToAirportMinuteOptions } from "@/config/preferences";
import { defaultPreferences } from "@/lib/preferences-format";
import type {
  AppLanguage,
  DistanceUnit,
  HomeAirport,
  TemperatureUnit,
  TimeFormat,
  TransportPreference,
  TravellerPreferences,
} from "@/types/preferences";

const languages: AppLanguage[] = ["en", "ja", "fr"];
const timeFormats: TimeFormat[] = ["12", "24"];
const distanceUnits: DistanceUnit[] = ["metric", "imperial"];
const temperatureUnits: TemperatureUnit[] = ["celsius", "fahrenheit"];
const transportPreferences: TransportPreference[] = [
  "taxi",
  "rideshare",
  "public",
  "rental",
  "walking",
];

function isOneOf<T extends string>(value: unknown, allowed: readonly T[]): value is T {
  return typeof value === "string" && allowed.includes(value as T);
}

function sanitizeHomeAirport(value: unknown): HomeAirport {
  if (!value || typeof value !== "object") {
    return defaultPreferences.homeAirport;
  }

  const raw = value as Partial<HomeAirport>;
  const match = homeAirportOptions.find(
    (option) => option.code === raw.code && option.city === raw.city,
  );

  if (match) {
    return { code: match.code, city: match.city };
  }

  const codeMatch = homeAirportOptions.find((option) => option.code === raw.code);
  if (codeMatch) {
    return { code: codeMatch.code, city: codeMatch.city };
  }

  return defaultPreferences.homeAirport;
}

function sanitizeHomeToAirportMinutes(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return defaultPreferences.homeToAirportMinutes;
  }

  const rounded = Math.round(value);
  if (homeToAirportMinuteOptions.includes(rounded as (typeof homeToAirportMinuteOptions)[number])) {
    return rounded;
  }

  const nearest = homeToAirportMinuteOptions.reduce((closest, option) =>
    Math.abs(option - rounded) < Math.abs(closest - rounded) ? option : closest,
  );

  return nearest;
}

export function sanitizePreferences(value: unknown): TravellerPreferences {
  if (!value || typeof value !== "object") {
    return defaultPreferences;
  }

  const raw = value as Partial<TravellerPreferences>;
  const notifications = raw.notifications;

  return {
    language: isOneOf(raw.language, languages)
      ? raw.language
      : defaultPreferences.language,
    timeFormat: isOneOf(raw.timeFormat, timeFormats)
      ? raw.timeFormat
      : defaultPreferences.timeFormat,
    distanceUnit: isOneOf(raw.distanceUnit, distanceUnits)
      ? raw.distanceUnit
      : defaultPreferences.distanceUnit,
    temperatureUnit: isOneOf(raw.temperatureUnit, temperatureUnits)
      ? raw.temperatureUnit
      : defaultPreferences.temperatureUnit,
    largerText:
      typeof raw.largerText === "boolean"
        ? raw.largerText
        : defaultPreferences.largerText,
    reducedMotion:
      typeof raw.reducedMotion === "boolean"
        ? raw.reducedMotion
        : defaultPreferences.reducedMotion,
    highContrast:
      typeof raw.highContrast === "boolean"
        ? raw.highContrast
        : defaultPreferences.highContrast,
    biometricSignIn:
      typeof raw.biometricSignIn === "boolean"
        ? raw.biometricSignIn
        : defaultPreferences.biometricSignIn,
    notifications: {
      journeyUpdates:
        typeof notifications?.journeyUpdates === "boolean"
          ? notifications.journeyUpdates
          : defaultPreferences.notifications.journeyUpdates,
      boardingReminders:
        typeof notifications?.boardingReminders === "boolean"
          ? notifications.boardingReminders
          : defaultPreferences.notifications.boardingReminders,
      flightChanges:
        typeof notifications?.flightChanges === "boolean"
          ? notifications.flightChanges
          : defaultPreferences.notifications.flightChanges,
      inAppAlerts:
        typeof notifications?.inAppAlerts === "boolean"
          ? notifications.inAppAlerts
          : defaultPreferences.notifications.inAppAlerts,
      pushNotifications:
        typeof notifications?.pushNotifications === "boolean"
          ? notifications.pushNotifications
          : defaultPreferences.notifications.pushNotifications,
    },
    homeAirport: sanitizeHomeAirport(raw.homeAirport),
    homeToAirportMinutes: sanitizeHomeToAirportMinutes(raw.homeToAirportMinutes),
    preferredTransport: isOneOf(raw.preferredTransport, transportPreferences)
      ? raw.preferredTransport
      : defaultPreferences.preferredTransport,
    frequentFlyer: {
      programme:
        typeof raw.frequentFlyer?.programme === "string" &&
        raw.frequentFlyer.programme.trim()
          ? raw.frequentFlyer.programme
          : defaultPreferences.frequentFlyer.programme,
      tier:
        typeof raw.frequentFlyer?.tier === "string" && raw.frequentFlyer.tier.trim()
          ? raw.frequentFlyer.tier
          : defaultPreferences.frequentFlyer.tier,
    },
  };
}
