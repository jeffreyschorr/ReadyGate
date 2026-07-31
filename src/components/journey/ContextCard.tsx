"use client";

import { Card } from "@/components/ui/Card";
import { WeatherConditionIcon } from "@/components/ui/WeatherConditionIcon";
import { useDisruptionActive } from "@/hooks/useDisruptionActive";
import { useTranslation } from "@/i18n/useTranslation";
import { disruptionEmphasisClass } from "@/lib/disruption-highlight";
import type { ContextCardData } from "@/types/journey";
import { cn } from "@/lib/utils";

type ContextCardProps = {
  card: ContextCardData;
};

export function ContextCard({ card }: ContextCardProps) {
  const disruptionActive = useDisruptionActive();
  const emphasizeValue =
    disruptionActive &&
    (card.disruptionEmphasis === "value" || card.disruptionEmphasis === "both");
  const emphasizeDetail =
    disruptionActive &&
    (card.disruptionEmphasis === "detail" || card.disruptionEmphasis === "both");

  return (
    <Card className="h-full">
      <div className="flex h-full items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm text-muted">{card.title}</h3>
          <p
            className={cn(
              "mt-2 text-lg font-semibold",
              emphasizeValue ? disruptionEmphasisClass : "text-foreground",
            )}
          >
            {card.value}
          </p>
          {card.detail ? (
            <p
              className={cn(
                "mt-1 text-sm leading-relaxed",
                emphasizeDetail ? disruptionEmphasisClass : "text-muted",
              )}
            >
              {card.detail}
            </p>
          ) : null}
        </div>
        {card.weatherIcon ? (
          <WeatherConditionIcon kind={card.weatherIcon} />
        ) : null}
      </div>
    </Card>
  );
}

type ContextCardGridProps = {
  cards: ContextCardData[];
  columns?: 1 | 2;
};

function chunkContextCardRows(cards: ContextCardData[]): ContextCardData[][] {
  const rows: ContextCardData[][] = [];
  let index = 0;

  while (index < cards.length) {
    const remaining = cards.length - index;

    if (remaining === 1) {
      rows.push([cards[index]]);
      index += 1;
    } else {
      rows.push([cards[index], cards[index + 1]]);
      index += 2;
    }
  }

  return rows;
}

export function ContextCardGrid({ cards, columns = 2 }: ContextCardGridProps) {
  const { t } = useTranslation();

  if (cards.length === 0) {
    return null;
  }

  if (columns === 1) {
    return (
      <div className="grid gap-4" role="list" aria-label={t("a11y.contextDetails")}>
        {cards.map((card) => (
          <div key={card.id} role="listitem">
            <ContextCard card={card} />
          </div>
        ))}
      </div>
    );
  }

  const rows = chunkContextCardRows(cards);

  return (
    <div className="space-y-4" role="list" aria-label={t("a11y.contextDetails")}>
      {rows.map((row) => (
        <div
          key={row.map((card) => card.id).join("-")}
          className={
            row.length === 2 ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "grid grid-cols-1"
          }
          role="presentation"
        >
          {row.map((card) => (
            <div key={card.id} role="listitem" className="h-full min-w-0">
              <ContextCard card={card} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
