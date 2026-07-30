import en from "@/i18n/locales/en.json";
import fr from "@/i18n/locales/fr.json";
import ja from "@/i18n/locales/ja.json";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/i18n/config";
import type {
  SupportedLocale,
  TFunction,
  TranslationDictionary,
  TranslationKey,
  TranslationValues,
} from "@/i18n/types";

const dictionaries: Record<SupportedLocale, TranslationDictionary> = {
  en,
  ja,
  fr,
};

function getNestedValue(
  dictionary: TranslationDictionary,
  key: string,
): string | undefined {
  const parts = key.split(".");
  let current: unknown = dictionary;

  for (const part of parts) {
    if (!current || typeof current !== "object" || !(part in current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : undefined;
}

function interpolate(template: string, values?: TranslationValues): string {
  if (!values) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, token: string) => {
    const value = values[token];
    return value === undefined ? `{${token}}` : String(value);
  });
}

function pluralize(
  locale: SupportedLocale,
  count: number,
  oneKey: TranslationKey,
  otherKey: TranslationKey,
  values?: TranslationValues,
): string {
  const key = count === 1 ? oneKey : otherKey;
  return createTranslator(locale)(key, { ...values, count });
}

const translatorLocales = new WeakMap<TFunction, SupportedLocale>();

function getNestedArray(
  dictionary: TranslationDictionary,
  key: string,
): string[] | undefined {
  const parts = key.split(".");
  let current: unknown = dictionary;

  for (const part of parts) {
    if (!current || typeof current !== "object" || !(part in current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return Array.isArray(current) &&
    current.every((item) => typeof item === "string")
    ? (current as string[])
    : undefined;
}

export function translateList(
  t: TFunction,
  key: string,
  valueSets?: (TranslationValues | undefined)[],
): string[] {
  const locale = translatorLocales.get(t) ?? DEFAULT_LOCALE;
  const dictionary = dictionaries[locale];
  const fallback = dictionaries[DEFAULT_LOCALE];
  const resolved = getNestedArray(dictionary, key) ?? getNestedArray(fallback, key);

  if (!resolved) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[i18n] Missing translation list: ${key}`);
    }

    return [];
  }

  return resolved.map((item, index) => interpolate(item, valueSets?.[index]));
}

export function createTranslator(locale: SupportedLocale): TFunction {
  const activeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const dictionary = dictionaries[activeLocale];
  const fallback = dictionaries[DEFAULT_LOCALE];

  const translator = (key: TranslationKey, values?: TranslationValues) => {
    const primary = getNestedValue(dictionary, key);
    const fallbackValue = getNestedValue(fallback, key);
    const resolved = primary ?? fallbackValue;

    if (resolved === undefined) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n] Missing translation key: ${key}`);
      }

      return fallbackValue ?? key.split(".").pop() ?? key;
    }

    if (primary === undefined && process.env.NODE_ENV === "development") {
      console.warn(`[i18n] Missing ${activeLocale} translation for: ${key}`);
    }

    return interpolate(resolved, values);
  };

  translatorLocales.set(translator, activeLocale);

  return translator;
}

export function createPluralTranslator(locale: SupportedLocale) {
  const t = createTranslator(locale);

  return {
    t,
    plural: (
      count: number,
      oneKey: TranslationKey,
      otherKey: TranslationKey,
      values?: TranslationValues,
    ) => pluralize(locale, count, oneKey, otherKey, values),
  };
}

export { dictionaries };
