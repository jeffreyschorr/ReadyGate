"use client";

import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { useTranslation } from "@/i18n/useTranslation";
import type { UpdateImportance, UpdateItem } from "@/types/journey";
import { cn } from "@/lib/utils";

type UpdateCardProps = {
  update: UpdateItem;
};

const iconMap = {
  gate: MeetingRoomOutlinedIcon,
  "check-in": AirplaneTicketOutlinedIcon,
  weather: CloudOutlinedIcon,
  boarding: FlightOutlinedIcon,
  baggage: LuggageOutlinedIcon,
  transport: DirectionsBusOutlinedIcon,
  reminder: NotificationsNoneOutlinedIcon,
  schedule: EventOutlinedIcon,
} as const;

const importanceStyles: Record<
  UpdateImportance,
  { chip: string; icon: string }
> = {
  normal: {
    chip: "bg-surface text-muted border-border",
    icon: "bg-background text-muted",
  },
  important: {
    chip: "bg-info-subtle text-info border-info/20",
    icon: "bg-info-subtle text-info",
  },
  critical: {
    chip: "bg-danger-subtle text-danger border-danger/20",
    icon: "bg-danger-subtle text-danger",
  },
};

export function UpdateCard({ update }: UpdateCardProps) {
  const { t } = useTranslation();
  const Icon = iconMap[update.icon];
  const styles = importanceStyles[update.importance];
  const importanceLabels: Record<UpdateImportance, string> = {
    normal: t("updates.importance.normal"),
    important: t("updates.importance.important"),
    critical: t("updates.importance.critical"),
  };

  return (
    <article className="flex gap-4 border-b border-border/50 py-6 last:border-b-0">
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          styles.icon,
        )}
        aria-hidden="true"
      >
        <Icon sx={{ fontSize: 20 }} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-base font-semibold text-heading">
            {update.title}
          </h2>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-xs font-medium",
              styles.chip,
            )}
          >
            {importanceLabels[update.importance]}
          </span>
        </div>

        <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
          {update.message}
        </p>

        <p className="mt-2 text-sm text-muted">{update.relativeTime}</p>
      </div>
    </article>
  );
}
