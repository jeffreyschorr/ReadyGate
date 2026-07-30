"use client";

import { JourneyDemoProvider } from "@/context/JourneyDemoContext";
import { JourneySimulator } from "@/components/demo/JourneySimulator";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <JourneyDemoProvider>
      {children}
      <JourneySimulator />
    </JourneyDemoProvider>
  );
}
