"use client";

import { AccountSettingsView } from "@/components/settings/AccountSettingsView";
import { SettingsPageContent } from "@/components/settings/SettingsPageContent";

export function SettingsAccountPageContent() {
  return (
    <SettingsPageContent
      titleKey="pages.settings.accountTitle"
      descriptionKey="pages.settings.accountDescription"
    >
      <AccountSettingsView />
    </SettingsPageContent>
  );
}
