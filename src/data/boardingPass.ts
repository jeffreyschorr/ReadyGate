import type { JourneyStageId } from "@/types/journey";

/** Demo journey steps 6, 7, and 8 (At airport → After security → Boarding). */
export const BOARDING_PASS_VISIBLE_STAGES = [
  "AT_AIRPORT",
  "AFTER_SECURITY",
  "BOARDING",
] as const satisfies readonly JourneyStageId[];

export function isBoardingPassVisibleStage(stage: JourneyStageId): boolean {
  return (BOARDING_PASS_VISIBLE_STAGES as readonly JourneyStageId[]).includes(stage);
}
