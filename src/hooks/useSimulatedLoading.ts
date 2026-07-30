"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

type UseSimulatedLoadingOptions = {
  /** When false, never show the loading state (for reference section pages). */
  enabled?: boolean;
};

export function useSimulatedLoading(
  dependency: string,
  durationMs = 400,
  options: UseSimulatedLoadingOptions = {},
): boolean {
  const { enabled = true } = options;
  const reducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    if (reducedMotion) {
      setIsLoading(false);
      return;
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), durationMs);
    return () => window.clearTimeout(timeout);
  }, [dependency, durationMs, reducedMotion, enabled]);

  if (!enabled) {
    return false;
  }

  return isLoading;
}
