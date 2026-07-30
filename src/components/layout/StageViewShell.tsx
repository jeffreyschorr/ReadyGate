"use client";

import { PageLoadingView } from "@/components/layout/PageLoadingView";
import { PageShell } from "@/components/layout/PageShell";
import {
  StageStagger,
  StageTransition,
} from "@/components/motion/StageTransition";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useSimulatedLoading } from "@/hooks/useSimulatedLoading";
import { pageLayout } from "@/lib/layout";
import { cn } from "@/lib/utils";
import type { JourneyStageId } from "@/types/journey";

type StageViewShellProps = {
  stage: JourneyStageId;
  loadingFallback: React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
  /** Live stage screens (Today) simulate loading on stage change; section pages do not. */
  simulateLoading?: boolean;
};

/** Shared loading, page shell, and stage transition wrapper for demo views. */
export function StageViewShell({
  stage,
  loadingFallback,
  children,
  containerClassName,
  simulateLoading = true,
}: StageViewShellProps) {
  const isLoading = useSimulatedLoading(stage, pageLayout.loadingMs, {
    enabled: simulateLoading,
  });

  if (isLoading) {
    return <PageLoadingView>{loadingFallback}</PageLoadingView>;
  }

  return (
    <PageShell>
      <Section>
        <Container className={cn(pageLayout.stack, containerClassName)}>
          <StageTransition stageKey={stage}>
            <StageStagger className={pageLayout.stack}>{children}</StageStagger>
          </StageTransition>
        </Container>
      </Section>
    </PageShell>
  );
}
