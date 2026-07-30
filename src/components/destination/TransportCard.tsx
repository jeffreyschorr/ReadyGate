"use client";

import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslation } from "@/i18n/useTranslation";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { DestinationTransportOption } from "@/types/journey";

type TransportCardProps = {
  options: DestinationTransportOption[];
  prominent?: boolean;
};

const iconMap = {
  bus: DirectionsBusOutlinedIcon,
  taxi: LocalTaxiOutlinedIcon,
  rideshare: HailOutlinedIcon,
  car: DirectionsCarOutlinedIcon,
  walk: DirectionsWalkOutlinedIcon,
} as const;

export function TransportCard({
  options,
  prominent = false,
}: TransportCardProps) {
  const { t } = useTranslation();

  return (
    <Card className={prominent ? "border-accent/20 bg-accent-subtle/25" : undefined}>
      <SectionHeading>{t("destination.transport")}</SectionHeading>
      <p className={cn(typography.bodySm, "mt-1 text-muted")}>
        {t("destination.transportSubtitle")}
      </p>

      <ul className="mt-5 space-y-4">
        {options.map((option) => {
          const Icon = iconMap[option.icon];

          return (
            <li
              key={option.id}
              className="flex items-start gap-3 border-b border-border/40 pb-4 last:border-b-0 last:pb-0"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background text-muted">
                <Icon sx={{ fontSize: 20 }} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {option.name}
                </p>
                <p className="mt-0.5 text-sm text-muted">{option.duration}</p>
                <p className="mt-0.5 text-sm text-muted">{option.cost}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
