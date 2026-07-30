"use client";

import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import Image from "next/image";

import { useEffectiveFlight } from "@/hooks/useEffectiveJourneyDisplay";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import type { MockJourney } from "@/types/journey";
import { cn } from "@/lib/utils";

type BoardingPassTicketProps = {
  journey: MockJourney;
  gate: string;
};

function TicketNotch({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -bottom-2 h-4 w-4 rounded-full bg-background shadow-[inset_0_0_12px_rgba(0,0,0,0.12)]",
        side === "left" ? "-left-2" : "-right-2",
      )}
    />
  );
}

function BoardingPassQr({ label }: { label: string }) {
  return (
    <div
      aria-label={label}
      className="relative mx-auto mt-5 aspect-square w-full max-w-[220px] overflow-hidden rounded-xl bg-white"
    >
      <Image
        src="/boarding-pass/qr-code.jpg"
        alt=""
        fill
        sizes="220px"
        className="object-cover"
        unoptimized
      />
    </div>
  );
}

function boardingGroupValue(boardingGroup: string): string {
  return boardingGroup.replace(/^Group\s+/i, "").trim() || boardingGroup;
}

export function BoardingPassTicket({ journey, gate }: BoardingPassTicketProps) {
  const { t } = useTravellerPreferences();
  const effectiveFlight = useEffectiveFlight();
  const { flight } = journey;

  return (
    <article
      className="w-full overflow-hidden rounded-xl bg-accent text-accent-foreground shadow-lg"
      aria-label={t("common.boardingPass")}
    >
      <header className="relative bg-[color-mix(in_srgb,var(--color-accent)_78%,black)] px-4 py-2.5">
        <TicketNotch side="left" />
        <TicketNotch side="right" />
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-medium leading-tight">
              <span>{flight.airline}</span>
              <span className="ml-2 text-xs font-normal text-white/70">{flight.number}</span>
            </p>
            <p className="mt-1 truncate text-xs text-white/70">{journey.passenger.fullName}</p>
          </div>
          <div className="shrink-0 text-center text-xs leading-tight">
            <p className="font-medium text-white/80">{t("common.gate")}</p>
            <p className="text-lg font-semibold text-white">{gate}</p>
          </div>
        </div>
      </header>

      <section className="relative border-b-2 border-dashed border-black/25 px-3 pb-3 pt-1">
        <TicketNotch side="left" />
        <TicketNotch side="right" />
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2">
          <div className="text-center">
            <p className="text-xs font-medium text-white/75">{flight.origin.city}</p>
            <p className="my-1 text-3xl font-normal tracking-wide">{flight.origin.code}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-white/50">
              {t("flight.boardingPassTicket.departing")}
            </p>
            <p className="text-[10px] text-white/50">
              {effectiveFlight.departureTime}
            </p>
          </div>

          <FlightOutlinedIcon
            sx={{ fontSize: 44, color: "rgba(255,255,255,0.2)", transform: "rotate(90deg)" }}
            aria-hidden="true"
          />

          <div className="text-center">
            <p className="text-xs font-medium text-white/75">{flight.destination.city}</p>
            <p className="my-1 text-3xl font-normal tracking-wide">{flight.destination.code}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-white/50">
              {t("flight.boardingPassTicket.arriving")}
            </p>
            <p className="text-[10px] text-white/50">
              {effectiveFlight.arrivalTime}
            </p>
          </div>
        </div>
      </section>

      <section className="px-3 pb-6 pt-2 text-center">
        <div className="grid grid-cols-3 gap-2">
          <div className="py-2">
            <p className="text-sm font-medium uppercase tracking-wide text-white/75">
              {t("flight.group")}
            </p>
            <p className="mt-2 text-xs font-medium text-white/70">
              {boardingGroupValue(flight.boardingGroup)}
            </p>
          </div>
          <div className="py-2">
            <p className="text-sm font-medium uppercase tracking-wide text-white/75">
              {t("common.seat")}
            </p>
            <p className="mt-2 text-xs font-medium text-white/70">{flight.seat}</p>
          </div>
          <div className="py-2">
            <p className="text-sm font-medium uppercase tracking-wide text-white/75">
              {t("flight.boardingPassTicket.class")}
            </p>
            <p className="mt-2 text-xs font-medium text-white/70">{flight.cabinClass}</p>
          </div>
        </div>

        <BoardingPassQr label={t("a11y.boardingPassQrPlaceholder")} />
      </section>
    </article>
  );
}
