export const DEMO_TOUR_STORAGE_KEY = "readygate-demo-tour-completed";

export function hasCompletedDemoTour(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  return window.localStorage.getItem(DEMO_TOUR_STORAGE_KEY) === "true";
}

export function markDemoTourCompleted(): void {
  window.localStorage.setItem(DEMO_TOUR_STORAGE_KEY, "true");
}
