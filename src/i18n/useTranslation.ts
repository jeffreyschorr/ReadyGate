"use client";

import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";

export function useTranslation() {
  const { t, locale, plural } = useTravellerPreferences();

  return { t, locale, plural };
}
