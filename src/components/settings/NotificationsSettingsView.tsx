"use client";

import {
  PreferenceSection,
  PreferenceSwitch,
} from "@/components/settings/PreferenceControls";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";

export function NotificationsSettingsView() {
  const { preferences, setPreference, t } = useTravellerPreferences();
  const { notifications } = preferences;

  function updateNotifications(
    patch: Partial<typeof notifications>,
  ) {
    setPreference("notifications", { ...notifications, ...patch });
  }

  return (
    <div className="space-y-6">
      <PreferenceSection
        title={t("settings.notifications.alertTypesTitle")}
        description={t("settings.notifications.alertTypesDescription")}
      >
        <PreferenceSwitch
          label={t("settings.notifications.journeyUpdates")}
          checked={notifications.journeyUpdates}
          onChange={(checked) => updateNotifications({ journeyUpdates: checked })}
        />
        <PreferenceSwitch
          label={t("settings.notifications.boardingReminders")}
          checked={notifications.boardingReminders}
          onChange={(checked) => updateNotifications({ boardingReminders: checked })}
        />
        <PreferenceSwitch
          label={t("settings.notifications.flightChanges")}
          checked={notifications.flightChanges}
          onChange={(checked) => updateNotifications({ flightChanges: checked })}
        />
      </PreferenceSection>

      <PreferenceSection
        title={t("settings.notifications.deliveryTitle")}
        description={t("settings.notifications.deliveryDescription")}
      >
        <PreferenceSwitch
          label={t("settings.notifications.inAppAlerts")}
          checked={notifications.inAppAlerts}
          onChange={(checked) => updateNotifications({ inAppAlerts: checked })}
        />
        <PreferenceSwitch
          label={t("settings.notifications.pushNotifications")}
          checked={notifications.pushNotifications}
          onChange={(checked) => updateNotifications({ pushNotifications: checked })}
        />
      </PreferenceSection>
    </div>
  );
}
