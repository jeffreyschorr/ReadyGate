"use client";

import Button from "@mui/material/Button";

import {
  DetailRow,
  PreferenceSection,
  PreferenceSwitch,
} from "@/components/settings/PreferenceControls";
import { demoAccount } from "@/config/demo-account";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";

export function AccountSettingsView() {
  const { preferences, setPreference, formatters, t } = useTravellerPreferences();

  return (
    <div className="space-y-6">
      <PreferenceSection
        title={t("settings.account.profileTitle")}
        description={t("settings.account.profileDescription")}
      >
        <dl>
          <DetailRow label={t("settings.account.fullName")} value={demoAccount.fullName} />
          <DetailRow label={t("settings.account.email")} value={demoAccount.email} />
          <DetailRow label={t("settings.account.mobile")} value={demoAccount.mobile} />
        </dl>
      </PreferenceSection>

      <PreferenceSection title={t("settings.account.signInTitle")}>
        <dl>
          <DetailRow
            label={t("settings.account.signInMethod")}
            value={t("settings.account.signInMethodEmail")}
          />
          <DetailRow
            label={t("settings.account.memberSince")}
            value={formatters.formatTravelDate(demoAccount.memberSince)}
          />
          <DetailRow
            label={t("settings.account.lastSignedIn")}
            value={formatters.formatRelativeTime(demoAccount.lastSignedIn)}
          />
        </dl>
      </PreferenceSection>

      <PreferenceSection
        title={t("settings.account.securityTitle")}
        description={t("settings.account.securityDescription")}
      >
        <PreferenceSwitch
          label={t("settings.account.biometricSignIn")}
          checked={preferences.biometricSignIn}
          onChange={(checked) => setPreference("biometricSignIn", checked)}
        />
        <Button variant="outlined" color="inherit" className="!mt-2">
          {t("settings.account.changePassword")}
        </Button>
      </PreferenceSection>
    </div>
  );
}
