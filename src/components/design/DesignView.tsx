import { PresentationBackLink } from "@/components/presentation/PresentationBackLink";
import { DesignSystemShowcase } from "@/components/design-system/DesignSystemShowcase";
import { Container } from "@/components/ui/Container";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function DesignView() {
  return (
    <div className="min-h-screen bg-background pb-16 pt-10 sm:pt-14">
      <Container className="max-w-4xl">
        <header className="space-y-6 pb-12">
          <PresentationBackLink />

          <div className="space-y-4">
            <h1 className={cn(typography.pageTitleLarge, "text-page-title")}>Design</h1>
            <p className={cn(typography.body, "max-w-2xl text-muted")}>
              Reusable ReadyGate components, tokens, and interaction patterns used across the
              concept demo.
            </p>
          </div>
        </header>

        <DesignSystemShowcase />
      </Container>
    </div>
  );
}
