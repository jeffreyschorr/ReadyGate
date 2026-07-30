import type { SupportedLocale } from "@/i18n/types";

/** Locales available for selection in Preferences. */
export const ENABLED_LOCALES: SupportedLocale[] = ["en", "ja", "fr"];

/** Default and fallback locale. */
export const DEFAULT_LOCALE: SupportedLocale = "en";

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  ja: "日本語",
  fr: "Français",
};

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return value === "en" || value === "ja" || value === "fr";
}

export function localeToHtmlLang(locale: SupportedLocale): string {
  return locale;
}

export function localeToIntlLocale(locale: SupportedLocale): string {
  if (locale === "ja") {
    return "ja-JP";
  }

  if (locale === "fr") {
    return "fr-FR";
  }

  return "en-AU";
}
