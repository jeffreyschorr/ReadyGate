"use client";

import { useContext } from "react";

import { JourneyDemoContext } from "@/context/JourneyDemoContext";

/** Returns whether the disruption scenario is active; false outside the demo provider. */
export function useDisruptionActive(): boolean {
  const context = useContext(JourneyDemoContext);
  return context?.disruptionActive ?? false;
}
