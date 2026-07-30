"use client";

import {
  DetailRow,
  PreferenceSection,
  PreferenceSwitch,
} from "@/components/settings/PreferenceControls";
import { SelectField } from "@/components/ui/FormControls";
import {
  homeAirportOptions,
  homeToAirportMinuteOptions,
  transportPreferenceOptions,
} from "@/config/preferences";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { typography } from "@/lib/typography";
import type {
  AppLanguage,
  DistanceUnit,
  HomeAirport,
  TemperatureUnit,
  TimeFormat,
  TransportPreference,
} from "@/types/preferences";
import { cn } from "@/lib/utils";

const AIRPORT_LABEL_KEYS = {
  BNE: "settings.homeAirport.brisbane",
  MEL: "settings.homeAirport.melbourne",
  SYD: "settings.homeAirport.sydney",
  ADL: "settings.homeAirport.adelaide",
  PER: "settings.homeAirport.perth",
} as const;

const TRANSPORT_LABEL_KEYS = {
  taxi: "settings.preferredTransport.taxi",
  rideshare: "settings.preferredTransport.rideshare",
  public: "settings.preferredTransport.publicTransport",
  rental: "settings.preferredTransport.rentalCar",
  walking: "settings.preferredTransport.walking",
} as const;

type RadioOption<T extends string | number> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type PreferenceRadioGroupProps<T extends string | number> = {
  label: string;
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
};

function PreferenceRadioGroup<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: PreferenceRadioGroupProps<T>) {
  const enabledOptions = options.filter((option) => !option.disabled);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (!keys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const currentIndex = enabledOptions.findIndex((option) => option.value === value);
    const startIndex = currentIndex >= 0 ? currentIndex : index;
    const nextIndex =
      (startIndex + direction + enabledOptions.length) % enabledOptions.length;
    const next = enabledOptions[nextIndex];

    if (next) {
      onChange(next.value);
      const group = event.currentTarget.closest('[role="radiogroup"]');
      group
        ?.querySelector<HTMLButtonElement>(`[data-value="${String(next.value)}"]`)
        ?.focus();
    }
  }

  return (
    <fieldset>
      <legend className={cn(typography.label, "mb-3 block text-foreground")}>
        {label}
      </legend>
      <div
        role="radiogroup"
        aria-label={label}
        className="flex flex-wrap gap-2"
      >
        {options.map((option, index) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={option.disabled}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              data-value={String(option.value)}
              className={cn(
                "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                selected
                  ? "border-accent bg-accent-subtle text-foreground"
                  : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground",
                option.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function PreferencesView() {
  const { preferences, setPreference, t } = useTravellerPreferences();

  const airportSelectValue = `${preferences.homeAirport.city}|${preferences.homeAirport.code}`;

  const airportOptions = homeAirportOptions.map((option) => ({
    label: t(AIRPORT_LABEL_KEYS[option.code]),
    value: `${option.city}|${option.code}`,
  }));

  const transportOptions = transportPreferenceOptions.map((option) => ({
    value: option.id,
    label: t(TRANSPORT_LABEL_KEYS[option.id]),
  }));

  return (
    <div className="space-y-6">
      <PreferenceSection title={t("settings.language.title")}>
        <PreferenceRadioGroup<AppLanguage>
          label={t("settings.language.displayLanguage")}
          value={preferences.language}
          onChange={(language) => setPreference("language", language)}
          options={[
            { value: "en", label: t("settings.language.english") },
            { value: "ja", label: t("settings.language.japanese") },
            { value: "fr", label: t("settings.language.french") },
          ]}
        />
      </PreferenceSection>

      <PreferenceSection title={t("settings.regionalFormats.title")}>
        <PreferenceRadioGroup<TimeFormat>
          label={t("settings.regionalFormats.timeFormat")}
          value={preferences.timeFormat}
          onChange={(timeFormat) => setPreference("timeFormat", timeFormat)}
          options={[
            { value: "24", label: t("settings.regionalFormats.hour24") },
            { value: "12", label: t("settings.regionalFormats.hour12") },
          ]}
        />
        <PreferenceRadioGroup<DistanceUnit>
          label={t("settings.regionalFormats.distanceUnits")}
          value={preferences.distanceUnit}
          onChange={(distanceUnit) => setPreference("distanceUnit", distanceUnit)}
          options={[
            { value: "metric", label: t("settings.regionalFormats.metric") },
            { value: "imperial", label: t("settings.regionalFormats.imperial") },
          ]}
        />
        <PreferenceRadioGroup<TemperatureUnit>
          label={t("settings.regionalFormats.temperature")}
          value={preferences.temperatureUnit}
          onChange={(temperatureUnit) =>
            setPreference("temperatureUnit", temperatureUnit)
          }
          options={[
            { value: "celsius", label: t("settings.regionalFormats.celsius") },
            { value: "fahrenheit", label: t("settings.regionalFormats.fahrenheit") },
          ]}
        />
      </PreferenceSection>

      <PreferenceSection title={t("settings.accessibility.title")}>
        <PreferenceSwitch
          label={t("settings.accessibility.largerText")}
          checked={preferences.largerText}
          onChange={(checked) => setPreference("largerText", checked)}
        />
        <PreferenceSwitch
          label={t("settings.accessibility.reducedMotion")}
          checked={preferences.reducedMotion}
          onChange={(checked) => setPreference("reducedMotion", checked)}
        />
        <PreferenceSwitch
          label={t("settings.accessibility.highContrast")}
          checked={preferences.highContrast}
          onChange={(checked) => setPreference("highContrast", checked)}
        />
      </PreferenceSection>

      <PreferenceSection
        title={t("settings.homeAirport.title")}
        description={t("settings.homeAirport.description")}
      >
        <SelectField
          label={t("settings.homeAirport.preferredAirport")}
          value={airportSelectValue}
          onChange={(next) => {
            const match = homeAirportOptions.find(
              (option) => `${option.city}|${option.code}` === next,
            );
            if (match) {
              setPreference("homeAirport", {
                city: match.city,
                code: match.code,
              } satisfies HomeAirport);
            }
          }}
          options={airportOptions}
        />
        <PreferenceRadioGroup<number>
          label={t("settings.homeAirport.travelTime")}
          value={preferences.homeToAirportMinutes}
          onChange={(homeToAirportMinutes) =>
            setPreference("homeToAirportMinutes", homeToAirportMinutes)
          }
          options={homeToAirportMinuteOptions.map((minutes) => ({
            value: minutes,
            label: t("settings.homeAirport.travelTimeOption", { minutes }),
          }))}
        />
      </PreferenceSection>

      <PreferenceSection
        title={t("settings.preferredTransport.title")}
        description={t("settings.preferredTransport.description")}
      >
        <PreferenceRadioGroup<TransportPreference>
          label={t("settings.preferredTransport.gettingAround")}
          value={preferences.preferredTransport}
          onChange={(preferredTransport) =>
            setPreference("preferredTransport", preferredTransport)
          }
          options={transportOptions}
        />
      </PreferenceSection>

      <PreferenceSection title={t("settings.frequentFlyer.title")}>
        <dl>
          <DetailRow
            label={t("settings.frequentFlyer.programme")}
            value={preferences.frequentFlyer.programme}
          />
          <DetailRow label={t("settings.frequentFlyer.membershipTier")} value={preferences.frequentFlyer.tier} />
        </dl>
      </PreferenceSection>
    </div>
  );
}
