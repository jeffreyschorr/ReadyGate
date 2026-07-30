"use client";

import { useEffect, useState } from "react";

import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";

export function useReducedMotion(): boolean {
  const { preferences } = useTravellerPreferences();
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReduced(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return preferences.reducedMotion || systemReduced;
}
