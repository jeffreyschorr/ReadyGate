"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { demoConfig } from "@/config/demo";
import {
  DISRUPTION_DEMO_STAGE,
  getDisruptionUnreadCount,
  getEffectiveJourneyDisplay,
} from "@/data/disruptionContent";
import { mockJourney } from "@/data/mockJourney";
import { getStageContent } from "@/data/stageContent";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { JOURNEY_STAGE_IDS } from "@/types/journey";
import type { JourneyStageId, MockJourney, StageContent } from "@/types/journey";

type JourneyDemoContextValue = {
  stage: JourneyStageId;
  journey: MockJourney;
  content: StageContent;
  setStage: (stage: JourneyStageId) => void;
  goToPreviousStage: () => void;
  goToNextStage: () => void;
  resetStage: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  stageIndex: number;
  stageCount: number;
  disruptionActive: boolean;
  triggerDisruptionScenario: () => void;
  acknowledgeDisruptionUpdates: () => void;
  updatesBadgeCount: number;
};

export const JourneyDemoContext = createContext<JourneyDemoContextValue | null>(
  null,
);

type JourneyDemoProviderProps = {
  children: ReactNode;
};

export function JourneyDemoProvider({ children }: JourneyDemoProviderProps) {
  const { display, formatters, t } = useTravellerPreferences();
  const [stage, setStageState] = useState<JourneyStageId>(demoConfig.defaultStage);
  const [disruptionActive, setDisruptionActive] = useState(false);
  const [disruptionAcknowledged, setDisruptionAcknowledged] = useState(false);

  const stageIndex = JOURNEY_STAGE_IDS.indexOf(stage);

  const clearDisruption = useCallback(() => {
    setDisruptionActive(false);
    setDisruptionAcknowledged(false);
  }, []);

  const setStage = useCallback((nextStage: JourneyStageId) => {
    setStageState(nextStage);
  }, []);

  const goToPreviousStage = useCallback(() => {
    if (stageIndex > 0) {
      setStage(JOURNEY_STAGE_IDS[stageIndex - 1]);
    }
  }, [setStage, stageIndex]);

  const goToNextStage = useCallback(() => {
    if (stageIndex < JOURNEY_STAGE_IDS.length - 1) {
      setStage(JOURNEY_STAGE_IDS[stageIndex + 1]);
    } else {
      setStage(JOURNEY_STAGE_IDS[0]);
    }
  }, [setStage, stageIndex]);

  const resetStage = useCallback(() => {
    setStageState(demoConfig.defaultStage);
    clearDisruption();
  }, [clearDisruption]);

  const triggerDisruptionScenario = useCallback(() => {
    setDisruptionActive(true);
    setDisruptionAcknowledged(false);

    const airportStageIndex = JOURNEY_STAGE_IDS.indexOf(DISRUPTION_DEMO_STAGE);
    if (stageIndex < airportStageIndex) {
      setStageState(DISRUPTION_DEMO_STAGE);
    }
  }, [stageIndex]);

  const acknowledgeDisruptionUpdates = useCallback(() => {
    if (disruptionActive) {
      setDisruptionAcknowledged(true);
    }
  }, [disruptionActive]);

  const content = useMemo(() => {
    const effectiveDisplay = getEffectiveJourneyDisplay(
      display,
      formatters,
      t,
      disruptionActive,
    );
    return getStageContent(stage, effectiveDisplay, t);
  }, [stage, display, formatters, t, disruptionActive]);

  const updatesBadgeCount = getDisruptionUnreadCount(
    disruptionActive,
    disruptionAcknowledged,
  );

  const value = useMemo<JourneyDemoContextValue>(
    () => ({
      stage,
      journey: mockJourney,
      content,
      setStage,
      goToPreviousStage,
      goToNextStage,
      resetStage,
      canGoPrevious: stageIndex > 0,
      canGoNext: stageIndex < JOURNEY_STAGE_IDS.length - 1,
      stageIndex,
      stageCount: JOURNEY_STAGE_IDS.length,
      disruptionActive,
      triggerDisruptionScenario,
      acknowledgeDisruptionUpdates,
      updatesBadgeCount,
    }),
    [
      stage,
      content,
      setStage,
      goToPreviousStage,
      goToNextStage,
      resetStage,
      stageIndex,
      disruptionActive,
      triggerDisruptionScenario,
      acknowledgeDisruptionUpdates,
      updatesBadgeCount,
    ],
  );

  return (
    <JourneyDemoContext.Provider value={value}>
      {children}
    </JourneyDemoContext.Provider>
  );
}
