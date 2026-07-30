"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslation } from "@/i18n/useTranslation";
import type { MockJourneyHotel } from "@/types/journey";
import { cn } from "@/lib/utils";

type HotelCardProps = {
  hotel: MockJourneyHotel;
  prominent?: boolean;
};

export function HotelCard({ hotel, prominent = false }: HotelCardProps) {
  const { t } = useTranslation();

  return (
    <Card className={cn(prominent && "border-accent/20 bg-accent-subtle/25")}>
      <SectionHeading>{t("destination.hotel")}</SectionHeading>

      <div className="mt-4 space-y-4">
        <div>
          <p className="text-lg font-semibold text-foreground">{hotel.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {hotel.address}
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">{t("destination.checkIn")}</dt>
            <dd className="mt-1 text-base font-medium text-foreground">
              {hotel.checkInTime}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">{t("destination.distance")}</dt>
            <dd className="mt-1 text-base font-medium text-foreground">
              {hotel.distance}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-muted">{t("destination.travelTime")}</dt>
            <dd className="mt-1 text-base font-medium text-foreground">
              {hotel.travelTime}
            </dd>
          </div>
        </dl>

        <p className="border-t border-border/50 pt-4 text-sm leading-relaxed text-muted">
          {hotel.earlyArrivalNote}
        </p>
      </div>
    </Card>
  );
}
