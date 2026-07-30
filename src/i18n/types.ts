import type en from "@/i18n/locales/en.json";

export type TranslationDictionary = typeof en;

type Join<K extends string, P extends string> = `${K}.${P}`;

type NestedKeyOf<T, Depth extends number = 6> = Depth extends 0
  ? never
  : T extends string
    ? never
    : {
        [K in keyof T & string]: T[K] extends string
          ? K
          : Join<K, NestedKeyOf<T[K], Prev[Depth]>>;
      }[keyof T & string];

type Prev = [never, 0, 1, 2, 3, 4, 5, 6];

export type TranslationKey = NestedKeyOf<TranslationDictionary>;

export type TranslationValues = Record<string, string | number>;

export type TFunction = (
  key: TranslationKey,
  values?: TranslationValues,
) => string;

export type SupportedLocale = "en" | "ja" | "fr";

export type Locale = SupportedLocale;
