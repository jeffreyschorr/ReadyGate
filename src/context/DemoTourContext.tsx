"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { DemoTourOverlay } from "@/components/demo/DemoTourOverlay";
import { demoConfig } from "@/config/demo";
import { DEMO_TOUR_STEPS } from "@/data/demoTourSteps";
import { HOME_ROUTE, isHomeRoute } from "@/lib/demo-routes";
import {
  hasCompletedDemoTour,
  markDemoTourCompleted,
} from "@/lib/demo-tour-storage";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";

type DemoTourContextValue = {
  isActive: boolean;
  stepIndex: number;
  stepCount: number;
  startTour: () => void;
  nextStep: () => void;
  skipTour: () => void;
};

const DemoTourContext = createContext<DemoTourContextValue | null>(null);

type DemoTourProviderProps = {
  children: ReactNode;
};

export function DemoTourProvider({ children }: DemoTourProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setStage } = useJourneyDemo();
  const [isActive, setIsActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [pendingStart, setPendingStart] = useState(false);
  const autoStartChecked = useRef(false);

  const finishTour = useCallback(() => {
    markDemoTourCompleted();
    setIsActive(false);
    setStepIndex(0);
    setPendingStart(false);
  }, []);

  const beginTour = useCallback(() => {
    setStage(demoConfig.defaultStage);
    setStepIndex(0);
    setIsActive(true);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [setStage]);

  const startTour = useCallback(() => {
    if (!demoConfig.showPanel) {
      return;
    }

    setStage(demoConfig.defaultStage);

    if (!isHomeRoute(pathname)) {
      setPendingStart(true);
      router.push(HOME_ROUTE);
      return;
    }

    beginTour();
  }, [beginTour, pathname, router, setStage]);

  const nextStep = useCallback(() => {
    if (stepIndex >= DEMO_TOUR_STEPS.length - 1) {
      finishTour();
      return;
    }

    setStepIndex((current) => current + 1);
  }, [finishTour, stepIndex]);

  const skipTour = useCallback(() => {
    finishTour();
  }, [finishTour]);

  useEffect(() => {
    if (!pendingStart || !isHomeRoute(pathname)) {
      return;
    }

    const timer = window.setTimeout(() => {
      beginTour();
      setPendingStart(false);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [beginTour, pathname, pendingStart]);

  useEffect(() => {
    if (!demoConfig.showPanel || autoStartChecked.current) {
      return;
    }

    autoStartChecked.current = true;

    if (hasCompletedDemoTour() || !isHomeRoute(pathname)) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!hasCompletedDemoTour()) {
        beginTour();
      }
    }, 700);

    return () => window.clearTimeout(timer);
  }, [beginTour, pathname]);

  const value = useMemo(
    () => ({
      isActive,
      stepIndex,
      stepCount: DEMO_TOUR_STEPS.length,
      startTour,
      nextStep,
      skipTour,
    }),
    [isActive, nextStep, skipTour, startTour, stepIndex],
  );

  return (
    <DemoTourContext.Provider value={value}>
      {children}
      {demoConfig.showPanel ? <DemoTourOverlay /> : null}
    </DemoTourContext.Provider>
  );
}

export function useDemoTour(): DemoTourContextValue {
  const context = useContext(DemoTourContext);

  if (!context) {
    throw new Error("useDemoTour must be used within DemoTourProvider");
  }

  return context;
}
