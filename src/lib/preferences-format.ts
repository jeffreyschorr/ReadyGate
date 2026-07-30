import type { SupportedLocale, TFunction } from "@/i18n/types";
import type { TravellerPreferences } from "@/types/preferences";

export type Formatters = {
  formatTime: (isoDate: string) => string;
  formatWalkMinutes: (minutes: number) => string;
  formatDriveMinutes: (minutes: number) => string;
  formatDurationMinutes: (minutes: number) => string;
  formatWalkMeters: (meters: number) => string;
  formatTemperature: (celsius: number) => string;
  formatTravelDate: (isoDate: string) => string;
  formatRelativeTime: (isoDate: string) => string;
};

export const defaultPreferences: TravellerPreferences = {
  language: "en",
  timeFormat: "12",
  distanceUnit: "metric",
  temperatureUnit: "celsius",
  largerText: false,
  reducedMotion: false,
  highContrast: false,
  biometricSignIn: true,
  notifications: {
    journeyUpdates: true,
    boardingReminders: true,
    flightChanges: true,
    inAppAlerts: true,
    pushNotifications: true,
  },
  homeAirport: { code: "BNE", city: "Brisbane" },
  homeToAirportMinutes: 35,
  preferredTransport: "rideshare",
  frequentFlyer: { programme: "Velocity", tier: "Gold" },
};

type FormatterOptions = Pick<
  TravellerPreferences,
  "timeFormat" | "distanceUnit" | "temperatureUnit"
> & {
  locale: SupportedLocale;
  t: TFunction;
};

export function createFormatters({
  timeFormat,
  distanceUnit,
  temperatureUnit,
  locale,
  t,
}: FormatterOptions): Formatters {
  const intlLocale =
    locale === "ja" ? "ja-JP" : locale === "fr" ? "fr-FR" : "en-AU";

  const formatTime = (isoDate: string) => {
    const formatted = new Intl.DateTimeFormat(intlLocale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: timeFormat === "12",
    }).format(new Date(isoDate));

    if (timeFormat === "24") {
      return formatted.replace(/\s*(am|pm|午前|午後)\.?/gi, "").trim();
    }

    if (locale === "ja") {
      return formatted;
    }

    return formatted.replace(/\b(am|pm)\.?/gi, (match) => match.toUpperCase());
  };

  const formatWalkMinutes = (minutes: number) =>
    t("format.walkMinutes", { minutes });

  const formatDriveMinutes = (minutes: number) => {
    if (distanceUnit === "metric") {
      return t("format.driveMinutesMetric", { minutes });
    }

    const miles = minutes * 0.6;
    return t("format.driveMinutesImperial", { miles: miles.toFixed(1) });
  };

  const formatDurationMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 1 && remainingMinutes > 0) {
      return t("format.durationOneHourMinutes", { minutes: remainingMinutes });
    }

    if (hours > 1 && remainingMinutes > 0) {
      return t("format.durationHoursMinutes", {
        hours,
        minutes: remainingMinutes,
      });
    }

    if (hours === 1) {
      return t("format.durationOneHour");
    }

    if (hours > 1) {
      return t("format.durationHours", { hours });
    }

    return t("format.durationMinutes", { minutes });
  };

  const formatWalkMeters = (meters: number) => {
    if (distanceUnit === "metric") {
      if (meters >= 1000) {
        return t("format.distanceKm", { value: (meters / 1000).toFixed(1) });
      }

      return t("format.distanceM", { value: meters });
    }

    const miles = meters / 1609.344;
    if (miles >= 0.1) {
      return t("format.distanceMi", { value: miles.toFixed(1) });
    }

    return t("format.distanceFt", { value: Math.round(meters * 3.28084) });
  };

  const formatTemperature = (celsius: number) => {
    if (temperatureUnit === "celsius") {
      return t("format.temperatureC", { value: Math.round(celsius) });
    }

    return t("format.temperatureF", {
      value: Math.round((celsius * 9) / 5 + 32),
    });
  };

  const formatTravelDate = (isoDate: string) =>
    new Intl.DateTimeFormat(intlLocale, {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date(isoDate));

  const formatRelativeTime = (isoDate: string) => {
    const now = new Date("2026-07-29T08:00:00+10:00");
    const date = new Date(isoDate);
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.round(diffMs / 60000);

    if (diffMinutes < 1) {
      return t("format.relativeTime.justNow");
    }

    if (diffMinutes < 60) {
      return t("format.relativeTime.minutesAgo", { count: diffMinutes });
    }

    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) {
      return t("format.relativeTime.hoursAgo", { count: diffHours });
    }

    const diffDays = Math.round(diffHours / 24);
    return diffDays === 1
      ? t("format.relativeTime.dayAgo")
      : t("format.relativeTime.daysAgo", { count: diffDays });
  };

  return {
    formatTime,
    formatWalkMinutes,
    formatDriveMinutes,
    formatDurationMinutes,
    formatWalkMeters,
    formatTemperature,
    formatTravelDate,
    formatRelativeTime,
  };
}
