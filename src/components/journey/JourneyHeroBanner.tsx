"use client";

import Image from "next/image";

import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import type { MockJourney } from "@/types/journey";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const DESTINATION_HERO_IMAGE = "/melbourne.jpg";

type JourneyHeroBannerProps = {
  journey: MockJourney;
};

export function JourneyHeroBanner({ journey }: JourneyHeroBannerProps) {
  const { display, t } = useTravellerPreferences();
  const { flight, weather, tripWindowLabel } = journey;
  const destination = flight.destination;

  return (
    <section
      aria-label={t("journey.page.heroLabel", { city: destination.city })}
      className="overflow-hidden rounded-xl border border-border/60"
    >
      <div className="relative h-36 sm:h-40">
        <Image
          src={DESTINATION_HERO_IMAGE}
          alt={t("journey.page.heroImageAlt", { city: destination.city })}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10"
          aria-hidden="true"
        />

        <div className="absolute top-3 left-3 rounded-full bg-black/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {flight.origin.code} → {destination.code}
        </div>

        <div className="absolute right-3 bottom-3 left-3">
          <p className="text-xs font-normal uppercase tracking-wide text-white/90">
            {t("journey.page.heroDestination")}
          </p>
          <p className="text-2xl font-semibold text-white">{destination.city}</p>
          <p className={cn(typography.bodySm, "text-white/85")}>
            {destination.airport} · {weather.destinationCondition}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-3 divide-x divide-border/60 bg-surface">
        <div className="px-3 py-3 text-center sm:px-4">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">
            {t("journey.page.heroTripWindow")}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">{tripWindowLabel}</dd>
        </div>
        <div className="px-3 py-3 text-center sm:px-4">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">
            {t("destination.weather")}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">{display.destinationTemp}</dd>
        </div>
        <div className="px-3 py-3 text-center sm:px-4">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">
            {t("journey.page.heroArrival")}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">{display.arrivalTime}</dd>
        </div>
      </dl>
    </section>
  );
}
