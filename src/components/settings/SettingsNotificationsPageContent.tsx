"use client";

import { NotificationsSettingsView } from "@/components/settings/NotificationsSettingsView";
import { SettingsPageContent } from "@/components/settings/SettingsPageContent";

export function SettingsNotificationsPageContent() {
  return (
    <SettingsPageContent
      titleKey="pages.settings.notificationsTitle"
      descriptionKey="pages.settings.notificationsDescription"
    >
      <NotificationsSettingsView />
    </SettingsPageContent>
  );
}
