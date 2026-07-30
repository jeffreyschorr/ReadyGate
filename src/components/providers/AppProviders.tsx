"use client";

import { JourneyDemoProvider } from "@/context/JourneyDemoContext";
import { DemoTourProvider } from "@/context/DemoTourContext";
import { JourneySimulator } from "@/components/demo/JourneySimulator";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <JourneyDemoProvider>
      <DemoTourProvider>
        {children}
        <JourneySimulator />
      </DemoTourProvider>
    </JourneyDemoProvider>
  );
}
