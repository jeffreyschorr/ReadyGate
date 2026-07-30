"use client";

import { BoardingPassTicket } from "@/components/flight/BoardingPassTicket";
import { Card } from "@/components/ui/Card";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import type { MockJourney } from "@/types/journey";

type BoardingPassCardProps = {
  journey: MockJourney;
  active: boolean;
  gate: string;
  note?: string;
};

export function BoardingPassCard({ journey, active, gate, note }: BoardingPassCardProps) {
  const { t } = useTravellerPreferences();

  if (active) {
    return <BoardingPassTicket journey={journey} gate={gate} />;
  }

  return (
    <Card className="overflow-hidden border-border/80 bg-background/80">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {t("common.boardingPass")}
      </p>
      <p className="mt-1 text-sm text-muted">{journey.flight.airline}</p>
      {note ? (
        <p className="mt-4 text-sm leading-relaxed text-muted">{note}</p>
      ) : null}
    </Card>
  );
}
