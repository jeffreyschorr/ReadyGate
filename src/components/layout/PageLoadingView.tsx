"use client";

import { Container } from "@/components/ui/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { useTranslation } from "@/i18n/useTranslation";
import { pageLayout } from "@/lib/layout";
import { cn } from "@/lib/utils";

type PageLoadingViewProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageLoadingView({ children, className }: PageLoadingViewProps) {
  const { t } = useTranslation();

  return (
    <PageShell>
      <Section aria-label={t("pages.loadingContent")}>
        <Container className={cn(pageLayout.stack, className)}>{children}</Container>
      </Section>
    </PageShell>
  );
}
