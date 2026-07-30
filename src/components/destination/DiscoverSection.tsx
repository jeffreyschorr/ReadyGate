"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { DestinationDiscoverItem } from "@/types/journey";

type DiscoverSectionProps = {
  items: DestinationDiscoverItem[];
};

export function DiscoverSection({ items }: DiscoverSectionProps) {
  const { formatters, t } = useTravellerPreferences();

  return (
    <Card>
      <SectionHeading>{t("journey.cardTitles.nearby")}</SectionHeading>
      <p className={cn(typography.bodySm, "mt-1 text-muted")}>{t("destination.discoverSubtitle")}</p>

      <ul className="mt-5 space-y-4">
        {items.slice(0, 5).map((item) => (
          <li
            key={item.id}
            className="border-b border-border/40 pb-4 last:border-b-0 last:pb-0"
          >
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <p className="mt-0.5 text-sm text-muted">
              {item.walkDistanceMeters
                ? `${item.detail} · ${formatters.formatWalkMeters(item.walkDistanceMeters)} walk`
                : item.detail}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
