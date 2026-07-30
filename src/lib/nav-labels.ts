import type { TFunction, TranslationKey } from "@/i18n/types";

const navKeyByHref: Record<string, TranslationKey> = {
  "/": "navigation.home",
  "/home": "navigation.today",
  "/journey": "navigation.journey",
  "/flight": "navigation.flight",
  "/destination": "navigation.destination",
  "/notifications": "navigation.updates",
};

const navKeyByLabelKey: Record<string, TranslationKey> = {
  today: "navigation.today",
  settings: "navigation.settings",
  profile: "navigation.profile",
};

export function navLabelForHref(
  href: string,
  fallback: string,
  t: TFunction,
  labelKey?: string,
): string {
  if (labelKey && labelKey in navKeyByLabelKey) {
    return t(navKeyByLabelKey[labelKey]);
  }

  const key = navKeyByHref[href];
  return key ? t(key) : fallback;
}
