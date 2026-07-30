"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { localeToHtmlLang } from "@/i18n/config";
import { createPluralTranslator } from "@/i18n/translate";
import type { SupportedLocale, TFunction } from "@/i18n/types";
import "@/i18n/validate-locales";
import { buildJourneyDisplay } from "@/lib/journey-display";
import {
  createFormatters,
  defaultPreferences,
} from "@/lib/preferences-format";
import { sanitizePreferences } from "@/lib/preferences-storage";
import type { Formatters } from "@/lib/preferences-format";
import type {
  JourneyDisplay,
  TravellerPreferences,
} from "@/types/preferences";

import { TRAVELLER_PREFERENCES_STORAGE_KEY } from "@/lib/storage-keys";

type TravellerPreferencesContextValue = {
  preferences: TravellerPreferences;
  locale: SupportedLocale;
  t: TFunction;
  plural: (
    count: number,
    oneKey: Parameters<TFunction>[0],
    otherKey: Parameters<TFunction>[0],
    values?: Record<string, string | number>,
  ) => string;
  formatters: Formatters;
  display: JourneyDisplay;
  updatePreferences: (patch: Partial<TravellerPreferences>) => void;
  setPreference: <K extends keyof TravellerPreferences>(
    key: K,
    value: TravellerPreferences[K],
  ) => void;
  resetPreferences: () => void;
};

const TravellerPreferencesContext =
  createContext<TravellerPreferencesContextValue | null>(null);

function readStoredPreferences(): TravellerPreferences {
  if (typeof window === "undefined") {
    return defaultPreferences;
  }

  try {
    const stored = window.localStorage.getItem(TRAVELLER_PREFERENCES_STORAGE_KEY);
    if (stored) {
      return sanitizePreferences(JSON.parse(stored));
    }
  } catch {
    // Ignore invalid storage.
  }

  return defaultPreferences;
}

function persistPreferences(preferences: TravellerPreferences) {
  try {
    window.localStorage.setItem(
      TRAVELLER_PREFERENCES_STORAGE_KEY,
      JSON.stringify(preferences),
    );
  } catch {
    // Ignore persistence failures.
  }
}

type TravellerPreferencesProviderProps = {
  children: ReactNode;
};

export function TravellerPreferencesProvider({
  children,
}: TravellerPreferencesProviderProps) {
  const [preferences, setPreferences] =
    useState<TravellerPreferences>(defaultPreferences);

  useEffect(() => {
    setPreferences(readStoredPreferences());
  }, []);

  const locale = preferences.language;
  const { t, plural } = useMemo(
    () => createPluralTranslator(locale),
    [locale],
  );

  const formatters = useMemo(
    () =>
      createFormatters({
        timeFormat: preferences.timeFormat,
        distanceUnit: preferences.distanceUnit,
        temperatureUnit: preferences.temperatureUnit,
        locale,
        t,
      }),
    [
      preferences.timeFormat,
      preferences.distanceUnit,
      preferences.temperatureUnit,
      locale,
      t,
    ],
  );

  const display = useMemo(
    () => buildJourneyDisplay(formatters, t, preferences.homeToAirportMinutes),
    [formatters, t, preferences.homeToAirportMinutes],
  );

  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang(locale);
    document.documentElement.classList.toggle(
      "pref-larger-text",
      preferences.largerText,
    );
    document.documentElement.classList.toggle(
      "pref-reduced-motion",
      preferences.reducedMotion,
    );
    document.documentElement.classList.toggle(
      "pref-high-contrast",
      preferences.highContrast,
    );
  }, [locale, preferences.largerText, preferences.reducedMotion, preferences.highContrast]);

  const setPreference = useCallback(
    <K extends keyof TravellerPreferences>(
      key: K,
      value: TravellerPreferences[K],
    ) => {
      setPreferences((current) => {
        const next = { ...current, [key]: value };
        persistPreferences(next);
        return next;
      });
    },
    [],
  );

  const updatePreferences = useCallback((patch: Partial<TravellerPreferences>) => {
    setPreferences((current) => {
      const next = { ...current, ...patch };
      persistPreferences(next);
      return next;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
    persistPreferences(defaultPreferences);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      locale,
      t,
      plural,
      formatters,
      display,
      updatePreferences,
      setPreference,
      resetPreferences,
    }),
    [
      preferences,
      locale,
      t,
      plural,
      formatters,
      display,
      updatePreferences,
      setPreference,
      resetPreferences,
    ],
  );

  return (
    <TravellerPreferencesContext.Provider value={value}>
      {children}
    </TravellerPreferencesContext.Provider>
  );
}

export function useTravellerPreferences(): TravellerPreferencesContextValue {
  const context = useContext(TravellerPreferencesContext);
  if (!context) {
    throw new Error(
      "useTravellerPreferences must be used within TravellerPreferencesProvider",
    );
  }
  return context;
}
