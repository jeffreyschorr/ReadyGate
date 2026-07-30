"use client";

import { useContext } from "react";

import { JourneyDemoContext } from "@/context/JourneyDemoContext";

export function useJourneyDemo() {
  const context = useContext(JourneyDemoContext);

  if (!context) {
    throw new Error("useJourneyDemo must be used within a JourneyDemoProvider");
  }

  return context;
}
