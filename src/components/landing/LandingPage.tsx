"use client";

import { LandingCtaSection } from "@/components/landing/LandingCtaSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingFoundationsSection } from "@/components/landing/LandingFoundationsSection";
import { LandingGlanceSection } from "@/components/landing/LandingGlanceSection";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";

export function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <LandingHeader />
      <main id="main-content" className="flex-1">
        <LandingHero />
        <LandingGlanceSection />
        <LandingFoundationsSection />
        <LandingCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
