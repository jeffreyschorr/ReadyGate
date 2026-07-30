import Link from "next/link";

import { BrandGuideSection } from "@/components/brand/BrandGuideSection";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MotionExample } from "@/components/brand/MotionExample";
import { NextAction } from "@/components/home/NextAction";
import { PresentationBackLink } from "@/components/presentation/PresentationBackLink";
import { JourneyMilestoneTimeline } from "@/components/journey/JourneyMilestoneTimeline";
import { CountdownCard } from "@/components/journey/CountdownCard";
import { JourneyHealth } from "@/components/journey/JourneyHealth";
import { UpdateCard } from "@/components/updates/UpdateCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  accessibilityGuidance,
  brandGuideDemoContent,
  brandGuideMeta,
  brandIdea,
  colorGuidance,
  colorTokens,
  componentExamples,
  iconExamples,
  iconGuidance,
  layoutGuidance,
  logoUsageRules,
  motionPrinciples,
  productPrinciples,
  pulseGuidance,
  pulseStates,
  spacingScale,
  spacingTokens,
  typographyGuidance,
  typographySpecimens,
  voiceTone,
} from "@/data/brandGuideContent";
import { defaultJourneyDisplay } from "@/lib/journey-display";
import { mockJourney } from "@/data/mockJourney";
import { createTranslator } from "@/i18n/translate";
import { getJourneyMilestones } from "@/data/journeyMilestones";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function BrandGuideView() {
  const t = createTranslator("en");
  const milestones = getJourneyMilestones("AT_AIRPORT", defaultJourneyDisplay, t).slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-16 pt-10 sm:pt-14">
      <Container className="max-w-4xl">
        <header className="space-y-6 pb-12">
          <PresentationBackLink />

          <div className="space-y-4">
            <h1
              className={cn(
                typography.pageTitleLarge,
                "text-page-title",
              )}
            >
              {brandGuideMeta.title}
            </h1>
            <p className={cn(typography.body, "max-w-2xl text-muted")}>
              {brandGuideMeta.description}
            </p>
            <p className={cn(typography.metadata, "text-muted")}>
              {brandGuideMeta.version}
              <span aria-hidden="true"> · </span>
              {brandGuideMeta.date}
            </p>
          </div>
        </header>

        <div className="space-y-12">
          <BrandGuideSection id="brand-idea" title="Brand Idea">
            <p className={cn(typography.body, "max-w-2xl text-foreground")}>
              {brandIdea.statement}
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {brandIdea.principles.map((principle) => (
                <li key={principle}>
                  <Card interactive={false} className="h-full">
                    <p className={cn(typography.label, "text-foreground")}>{principle}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </BrandGuideSection>

          <BrandGuideSection id="logo" title="Logo">
            <div className="grid gap-6 lg:grid-cols-2">
              <LogoPanel label="Icon with wordmark">
                <BrandLogo variant="lockup" size="lg" />
              </LogoPanel>
              <LogoPanel label="Wordmark only">
                <BrandLogo variant="wordmark" />
              </LogoPanel>
              <LogoPanel label="Icon only">
                <BrandLogo variant="icon" size="lg" />
              </LogoPanel>
              <LogoPanel label="Light background">
                <BrandLogo variant="lockup" size="lg" />
              </LogoPanel>
              <LogoPanel label="Dark background" dark>
                <BrandLogo variant="lockup" theme="dark" size="lg" />
              </LogoPanel>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className={cn(typography.cardHeading, "text-card-heading")}>
                  Typography
                </h3>
                <p className={cn(typography.bodySm, "text-muted")}>
                  Lockup assets at 800×183px · Wordmark uses Plus Jakarta Sans when rendered
                  as text · Weight 700 · Letter spacing approximately -0.02em
                </p>
              </div>
              <div className="space-y-3">
                <h3 className={cn(typography.cardHeading, "text-card-heading")}>
                  Usage
                </h3>
                <ul className="space-y-2">
                  {logoUsageRules.map((rule) => (
                    <li
                      key={rule}
                      className={cn(typography.bodySm, "flex gap-3 text-muted")}
                    >
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-muted" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </BrandGuideSection>

          <BrandGuideSection id="typography" title="Typography">
            <p className={cn(typography.bodySm, "text-muted")}>
              Primary typeface: Plus Jakarta Sans, loaded via next/font/google.
            </p>
            <div className="divide-y divide-border rounded-xl border border-border bg-surface">
              {typographySpecimens.map((specimen) => (
                <div
                  key={specimen.role}
                  className="grid gap-4 px-6 py-5 sm:grid-cols-[8rem_1fr_6rem_7rem] sm:items-center"
                >
                  <p className={cn(typography.label, "text-muted")}>{specimen.role}</p>
                  <p className={cn(specimen.className, "text-foreground")}>{specimen.sample}</p>
                  <p className={cn(typography.metadata, "text-muted")}>{specimen.weight}</p>
                  <p className={cn(typography.metadata, "text-muted")}>{specimen.size}</p>
                </div>
              ))}
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {typographyGuidance.map((item) => (
                <li key={item} className={cn(typography.bodySm, "text-muted")}>
                  {item}
                </li>
              ))}
            </ul>
          </BrandGuideSection>

          <BrandGuideSection id="colour" title="Colour System">
            <div className="grid gap-4 sm:grid-cols-2">
              {colorTokens.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {colorGuidance.map((item) => (
                <li key={item} className={cn(typography.bodySm, "text-muted")}>
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-4 rounded-xl border border-border bg-surface p-6">
              <div>
                <h3 className={cn(typography.cardHeading, "text-card-heading")}>
                  Journey pulse
                </h3>
                <p className={cn(typography.bodySm, "mt-1 text-muted")}>
                  Today screen status badges. Each state uses a status colour plus a text label.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {pulseStates.map((state) => (
                  <Card key={state.label} interactive={false} className="h-full">
                    <StatusBadge label={state.label} variant={state.variant} />
                    <p className={cn(typography.bodySm, "mt-3 text-foreground")}>
                      {state.meaning}
                    </p>
                    <p className={cn(typography.metadata, "mt-2 normal-case text-muted")}>
                      {state.when}
                    </p>
                  </Card>
                ))}
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {pulseGuidance.map((item) => (
                  <li key={item} className={cn(typography.bodySm, "text-muted")}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </BrandGuideSection>

          <BrandGuideSection id="spacing" title="Spacing and Layout">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card interactive={false}>
                <ul className="divide-y divide-border">
                  {spacingTokens.map((item) => (
                    <li
                      key={item.name}
                      className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr]"
                    >
                      <p className={cn(typography.label, "text-foreground")}>{item.name}</p>
                      <div>
                        <p className={cn(typography.bodySm, "text-foreground")}>{item.value}</p>
                        <p className={cn(typography.metadata, "mt-0.5 normal-case text-muted")}>
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>

              <div className="space-y-4">
                <p className={cn(typography.label, "text-muted")}>Spacing scale</p>
                <div className="flex flex-wrap items-end gap-3">
                  {spacingScale.map((step) => (
                    <div key={step.label} className="flex flex-col items-center gap-2">
                      <div
                        className="rounded-sm bg-accent/20"
                        style={{ width: step.size, height: step.size, minWidth: "0.25rem", minHeight: "0.25rem" }}
                        aria-hidden
                      />
                      <span className={cn(typography.metadata, "normal-case text-muted")}>
                        {step.label}px
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ul className="grid gap-2">
              {layoutGuidance.map((item) => (
                <li key={item} className={cn(typography.bodySm, "text-muted")}>
                  {item}
                </li>
              ))}
            </ul>
          </BrandGuideSection>

          <BrandGuideSection id="components" title="Core Components">
            <div className="grid gap-8 xl:grid-cols-2">
              <ComponentExample title={componentExamples[0].name} note={componentExamples[0].note}>
                <Button>Continue to boarding</Button>
              </ComponentExample>
              <ComponentExample title={componentExamples[1].name} note={componentExamples[1].note}>
                <Button variant="secondary">View details</Button>
              </ComponentExample>
              <ComponentExample title={componentExamples[2].name} note={componentExamples[2].note}>
                <div className="space-y-4">
                  <div>
                    <p className={cn(typography.metadata, "mb-2 normal-case text-muted")}>
                      Journey pulse
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pulseStates.map((state) => (
                        <StatusBadge
                          key={state.label}
                          label={state.label}
                          variant={state.variant}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={cn(typography.metadata, "mb-2 normal-case text-muted")}>
                      Flight and health status
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge label="On time" variant="success" />
                      <StatusBadge label="Boarding" variant="warning" />
                      <StatusBadge label="Cancelled" variant="danger" />
                      <StatusBadge label="Check-in open" variant="info" />
                      <StatusBadge label="Scheduled" variant="neutral" />
                    </div>
                  </div>
                </div>
              </ComponentExample>
              <ComponentExample title={componentExamples[3].name} note={componentExamples[3].note}>
                <Card interactive={false}>
                  <h3 className={cn(typography.cardHeading, "text-card-heading")}>
                    {defaultJourneyDisplay.gateLabel}
                  </h3>
                  <p className={cn(typography.bodySm, "mt-2 text-muted")}>
                    {mockJourney.flight.origin.terminal} · Boarding at {defaultJourneyDisplay.boardingTime}
                  </p>
                </Card>
              </ComponentExample>
              <ComponentExample
                title={componentExamples[4].name}
                note={componentExamples[4].note}
                className="xl:col-span-2"
              >
                <NextAction
                  action={brandGuideDemoContent.nextAction}
                  urgency="medium"
                  compact
                />
              </ComponentExample>
              <ComponentExample
                title={componentExamples[5].name}
                note={componentExamples[5].note}
                className="xl:col-span-2"
              >
                <JourneyMilestoneTimeline milestones={milestones} />
              </ComponentExample>
              <ComponentExample
                title={componentExamples[6].name}
                note={componentExamples[6].note}
                className="xl:col-span-2"
              >
                <Card interactive={false} padding="none">
                  <div className="px-6">
                    <UpdateCard update={brandGuideDemoContent.update} />
                  </div>
                </Card>
              </ComponentExample>
              <ComponentExample title={componentExamples[7].name} note={componentExamples[7].note}>
                <CountdownCard countdown={brandGuideDemoContent.countdown} />
              </ComponentExample>
              <ComponentExample title={componentExamples[8].name} note={componentExamples[8].note}>
                <JourneyHealth items={brandGuideDemoContent.healthItems} />
              </ComponentExample>
              <ComponentExample
                title={componentExamples[9].name}
                note={componentExamples[9].note}
                className="xl:col-span-2"
              >
                <EmptyState
                  title={brandGuideDemoContent.emptyState.title}
                  description={brandGuideDemoContent.emptyState.description}
                />
              </ComponentExample>
            </div>
          </BrandGuideSection>

          <BrandGuideSection id="iconography" title="Iconography">
            <p className={cn(typography.bodySm, "text-muted")}>
              Outline icons with even stroke weight. Pair with text, never replace it.
            </p>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
              {iconExamples.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface px-3 py-4 text-center"
                >
                  <Icon sx={{ fontSize: 20 }} className="text-accent" aria-hidden />
                  <span className={cn(typography.metadata, "normal-case text-muted")}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {iconGuidance.map((item) => (
                <li key={item} className={cn(typography.bodySm, "text-muted")}>
                  {item}
                </li>
              ))}
            </ul>
          </BrandGuideSection>

          <BrandGuideSection id="voice" title="Voice and Tone">
            <div className="flex flex-wrap gap-2">
              {voiceTone.qualities.map((quality) => (
                <span
                  key={quality}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {quality}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              {voiceTone.avoidPrefer.map((example) => (
                <Card key={example.avoid} interactive={false}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className={cn(typography.metadata, "text-danger")}>Avoid</p>
                      <p className={cn(typography.bodySm, "mt-1 text-muted line-through")}>
                        {example.avoid}
                      </p>
                    </div>
                    <div>
                      <p className={cn(typography.metadata, "text-success")}>Prefer</p>
                      <p className={cn(typography.bodySm, "mt-1 text-foreground")}>
                        {example.prefer}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {voiceTone.rules.map((rule) => (
                <li key={rule} className={cn(typography.bodySm, "text-muted")}>
                  {rule}
                </li>
              ))}
            </ul>
          </BrandGuideSection>

          <BrandGuideSection id="motion" title="Motion Principles">
            <div className="grid gap-8 lg:grid-cols-2">
              <ul className="space-y-2">
                {motionPrinciples.map((principle) => (
                  <li key={principle} className={cn(typography.bodySm, "text-muted")}>
                    {principle}
                  </li>
                ))}
              </ul>
              <MotionExample />
            </div>
          </BrandGuideSection>

          <BrandGuideSection id="accessibility" title="Accessibility">
            <ul className="grid gap-2 sm:grid-cols-2">
              {accessibilityGuidance.map((item) => (
                <li key={item} className={cn(typography.bodySm, "text-muted")}>
                  {item}
                </li>
              ))}
            </ul>
          </BrandGuideSection>

          <BrandGuideSection id="product-principles" title="Product Principles">
            <ul className="space-y-4">
              {productPrinciples.map((principle) => (
                <li
                  key={principle}
                  className="border-l-2 border-accent/30 pl-4"
                >
                  <p className={cn(typography.body, "text-foreground")}>{principle}</p>
                </li>
              ))}
            </ul>
          </BrandGuideSection>
        </div>

        <footer className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:flex-wrap">
          <Button component={Link} href="/home">
            Start demo
          </Button>
          <Button variant="secondary" component={Link} href="/engineering">
            Engineering Decisions
          </Button>
          <Button variant="ghost" component={Link} href="/">
            Back to introduction
          </Button>
        </footer>
      </Container>
    </div>
  );
}

type LogoPanelProps = {
  label: string;
  dark?: boolean;
  children: React.ReactNode;
};

function LogoPanel({ label, dark = false, children }: LogoPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-8",
        dark ? "border-foreground/10 bg-foreground" : "border-border bg-surface",
      )}
    >
      <p
        className={cn(
          typography.metadata,
          "mb-6 normal-case",
          dark ? "text-white/60" : "text-muted",
        )}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

type ColorSwatchProps = {
  name: string;
  hex: string;
  token: string;
  usage: string;
};

function ColorSwatch({ name, hex, token, usage }: ColorSwatchProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-surface p-4">
      <div
        className="h-14 w-14 shrink-0 rounded-lg border border-border/60"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <div className="min-w-0">
        <p className={cn(typography.label, "text-foreground")}>{name}</p>
        <p className={cn(typography.metadata, "mt-1 normal-case text-muted")}>{hex}</p>
        <p className={cn(typography.metadata, "mt-0.5 normal-case text-muted")}>{token}</p>
        <p className={cn(typography.bodySm, "mt-2 text-muted")}>{usage}</p>
      </div>
    </div>
  );
}

type ComponentExampleProps = {
  title: string;
  note: string;
  children: React.ReactNode;
  className?: string;
};

function ComponentExample({ title, note, children, className }: ComponentExampleProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <h3 className={cn(typography.cardHeading, "text-card-heading")}>
          {title}
        </h3>
        <p className={cn(typography.bodySm, "mt-1 text-muted")}>{note}</p>
      </div>
      {children}
    </div>
  );
}
