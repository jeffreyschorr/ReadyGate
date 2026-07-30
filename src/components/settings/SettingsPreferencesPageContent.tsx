"use client";

import { PreferencesView } from "@/components/settings/PreferencesView";
import { SettingsPageContent } from "@/components/settings/SettingsPageContent";

export function SettingsPreferencesPageContent() {
  return (
    <SettingsPageContent
      titleKey="pages.settings.preferencesTitle"
      descriptionKey="pages.settings.preferencesDescription"
    >
      <PreferencesView />
    </SettingsPageContent>
  );
}
