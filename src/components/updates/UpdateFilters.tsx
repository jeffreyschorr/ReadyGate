"use client";

import Chip from "@mui/material/Chip";

import { useTranslation } from "@/i18n/useTranslation";
import type { UpdateFilterId } from "@/types/journey";
import { cn } from "@/lib/utils";

type UpdateFiltersProps = {
  activeFilter: UpdateFilterId;
  onFilterChange: (filter: UpdateFilterId) => void;
};

const filterIds: UpdateFilterId[] = [
  "all",
  "important",
  "flight",
  "journey",
  "destination",
];

const filterKeys = {
  all: "updates.filters.all",
  important: "updates.filters.important",
  flight: "updates.filters.flight",
  journey: "updates.filters.journey",
  destination: "updates.filters.destination",
} as const;

export function UpdateFilters({
  activeFilter,
  onFilterChange,
}: UpdateFiltersProps) {
  const { t } = useTranslation();

  return (
    <div
      role="tablist"
      aria-label={t("a11y.filterUpdates")}
      className="flex flex-wrap gap-2"
    >
      {filterIds.map((filterId) => {
        const isActive = activeFilter === filterId;

        return (
          <Chip
            key={filterId}
            role="tab"
            aria-selected={isActive}
            label={t(filterKeys[filterId])}
            onClick={() => onFilterChange(filterId)}
            variant={isActive ? "filled" : "outlined"}
            className={cn(
              "font-medium",
              isActive
                ? "bg-accent text-accent-foreground"
                : "border-border bg-surface text-muted",
            )}
          />
        );
      })}
    </div>
  );
}
