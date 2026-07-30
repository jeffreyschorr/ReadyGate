import { demoConfig } from "@/config/demo";
import { defaultPreferences } from "@/lib/preferences-format";
import { TRAVELLER_PREFERENCES_STORAGE_KEY } from "@/lib/storage-keys";

export function clearStoredDemoStage(): void {
  try {
    window.localStorage.removeItem(demoConfig.storageKey);
  } catch {
    // Ignore storage failures in private browsing.
  }
}

export function resetDemoStorage(): void {
  clearStoredDemoStage();
  try {
    window.localStorage.removeItem(TRAVELLER_PREFERENCES_STORAGE_KEY);
  } catch {
    // Ignore storage failures in private browsing.
  }
}

export function getDefaultDemoPreferences() {
  return { ...defaultPreferences };
}
