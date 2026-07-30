"use client";

import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { settingsPageSectionClassName } from "@/components/settings/settings-page-styles";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { useTranslation } from "@/i18n/useTranslation";
import type { TranslationKey } from "@/i18n/types";

type SettingsPageContentProps = {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  children: React.ReactNode;
};

export function SettingsPageContent({
  titleKey,
  descriptionKey,
  children,
}: SettingsPageContentProps) {
  const { t } = useTranslation();

  return (
    <PageShell>
      <Section className={settingsPageSectionClassName()}>
        <Container>
          <PageHeader title={t(titleKey)} description={t(descriptionKey)} />
          <SettingsLayout>{children}</SettingsLayout>
        </Container>
      </Section>
    </PageShell>
  );
}
