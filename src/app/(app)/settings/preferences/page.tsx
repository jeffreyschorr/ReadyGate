import type { Metadata } from "next";

import { SettingsPreferencesPageContent } from "@/components/settings/SettingsPreferencesPageContent";

export const metadata: Metadata = {
  title: "Traveller preferences",
  description: "Language, units, and display.",
};

export default function SettingsPreferencesPage() {
  return <SettingsPreferencesPageContent />;
}
