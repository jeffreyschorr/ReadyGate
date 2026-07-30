"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function NotFoundView() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <Section>
        <Container className="max-w-lg py-16">
          <h1 className={cn(typography.pageTitle, "text-page-title")}>
            {t("errors.notFoundTitle")}
          </h1>
          <p className={cn(typography.body, "mt-4 text-muted")}>
            {t("errors.notFoundDescription")}
          </p>
          <div className="mt-8">
            <Button component={Link} href="/">
              {t("errors.backToIntro")}
            </Button>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
